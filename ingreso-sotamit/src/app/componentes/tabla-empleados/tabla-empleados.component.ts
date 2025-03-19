import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConexionApiService } from '../../servicios/conexion-api.service';
import { delay, Subscription } from 'rxjs';
import { SpinnerComponent } from '../spinner/spinner.component';
import { DateFormatPipePipe } from '../../pipes/date-format-pipe.pipe';
import { NgClass } from '@angular/common';
import { SweetAlert } from '../../clases/sweetAlert';
import { BooleanPipePipe } from '../../pipes/boolean-pipe.pipe';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { mayorDeEdadValidator } from '../../validators/mayor-de-edad';
import { alMenosUnCampoRequeridoValidator } from '../../validators/al-menos-un-campo';
declare var bootstrap: any;

@Component({
  selector: 'app-tabla-empleados',
  standalone: true,
  imports: [SpinnerComponent, DateFormatPipePipe, NgClass, BooleanPipePipe, FormsModule, ReactiveFormsModule],
  templateUrl: './tabla-empleados.component.html',
  styleUrl: './tabla-empleados.component.css'
})
export class TablaEmpleadosComponent implements OnInit
{
  private suscripcionEmpleados!: Subscription;
  private suscripcionAreas!: Subscription;
  private suscripcionEliminarEmpleado!: Subscription;
  public empleadoSeleccionado!: any;
  public formModificarEmpleado!: FormGroup;
  public areas: any;
  public empleados: any;
  public claseSpinner = "spinner-desactivado";
  private swal = new SweetAlert();
  public toggleModificar = false;
  public errorEnLaObtencionDeDatos = false;
  @ViewChild('modalDetalles') modalDetalles!: ElementRef;

  constructor(private conexionApiService: ConexionApiService, public fb: FormBuilder) { }


  ngOnInit(): void
  {
    this.mostrarSpinner();

    this.formModificarEmpleado = this.fb.group({
      dni: ['', [Validators.min(1), Validators.max(2147483647)]],
      nombre: ['', [Validators.pattern("^[A-Za-zÁÉÍÓÚáéíóúÑñÜü -]{1,50}$")]],
      fechaNacimiento: ['', [mayorDeEdadValidator()],],
      descripcion: ['', [Validators.maxLength(100)]],
      desarrollador: ['', []],
      idArea: ['', []]
    }, { validators: alMenosUnCampoRequeridoValidator()})


    let pendingRequests = 2;
    const ocultarSpinnerCuandoTermine = () =>
    {
      pendingRequests--;
      if (pendingRequests === 0)
      {
        this.ocultarSpinner();
      }
    };

    this.suscripcionEmpleados = this.conexionApiService.getEmpleados()
      .subscribe({
        next: (data: any) =>
        {
          if (data.status == "OK")
          {
            this.empleados = data.empleados;
          }
          ocultarSpinnerCuandoTermine();
        },
        error: err =>
        {
          this.errorEnLaObtencionDeDatos = true;
          const errorMessage = err?.error?.message || "Ocurrió un error inesperado, intente recargando la página.";
          this.swal.mostrarMensajeError("ERROR", errorMessage);
          ocultarSpinnerCuandoTermine();
        }
      });

    this.suscripcionAreas = this.conexionApiService.getAreas()
      .subscribe({
        next: (data: any) =>
        {
          this.areas = data.areas;
          ocultarSpinnerCuandoTermine();
        },
        error: err =>
        {
          this.errorEnLaObtencionDeDatos = true;
          const errorMessage = err?.error?.message || "Ocurrió un error inesperado, intente recargando la página.";
          this.swal.mostrarMensajeError("ERROR", errorMessage);
          ocultarSpinnerCuandoTermine();
        }
      });
  }

  ngOnDestroy(): void
  {
    if (this.suscripcionEmpleados)
    {
      this.suscripcionEmpleados.unsubscribe();
    }
    if (this.suscripcionAreas)
    {
      this.suscripcionAreas.unsubscribe();
    }
    if (this.suscripcionEliminarEmpleado)
    {
      this.suscripcionEliminarEmpleado.unsubscribe();
    }
  }

  obtenerNombreAreaPorId(id: number): string | any
  {
    const area = this.areas.find((area: any) => area.id === id);
    return area ? area.nombre : undefined;
  }

  seleccionarEmpleado(id: number)
  {
    this.empleadoSeleccionado = this.empleados.find((empleado: any) => empleado.id === id);
  }

  eliminarEmpleadoSeleccionado()
  {
    this.swal.mostrarMensajeConfirmar("Advertencia", "Está a punto de eliminar a " + this.empleadoSeleccionado.nombre + ".").then((resultado) =>
    {
      if (resultado.isConfirmed)
      {
        this.mostrarSpinner();
        this.suscripcionEliminarEmpleado = this.conexionApiService.eliminarEmpleado(this.empleadoSeleccionado.id).subscribe({
          next: (data: any) =>
          {
            this.swal.mostrarMensajeExito("Eliminado", "¡El empleado fue dado de baja exitosamente!")
            this.resetearTabla();
            this.ocultarSpinner();
          },
          error: err =>
          {
            const errorMessage = err?.error?.message || "Ocurrió un error inesperado, intente recargando la página.";
            this.swal.mostrarMensajeError("ERROR", errorMessage);
            this.ocultarSpinner();
          }
        })
      }
      else
      {
        const modal: any = new bootstrap.Modal(this.modalDetalles.nativeElement);
        modal.show();      }
    })
  }

  resetearTabla()
  {
    this.ngOnInit();
  }


  enviarFormModificarEmpleado()
  {
    if (this.formModificarEmpleado.valid)
    {
      this.mostrarSpinner();

      let empleado = {
        nombre: this.nombre?.value === "" ? null : this.nombre?.value,
        dni: this.dni?.value === "" ? null : this.dni?.value,
        nacimiento: this.fechaNacimiento?.value === "" ? null : this.fechaNacimiento?.value,
        descripcion: this.descripcion?.value === "" ? null : this.descripcion?.value,
        id_area: this.idArea?.value === "" ? null : this.idArea?.value,
        desarrollador: this.desarrollador?.value === "" ? null : this.desarrollador?.value
      };

      this.conexionApiService.modificarEmpleado(this.empleadoSeleccionado.id, empleado).subscribe({
        next: (data: any) => {
          console.log(data);
          this.swal.mostrarMensajeExito("Modificado", "¡El empleado fue editado exitosamente!")
          this.resetearTabla();
          this.ocultarSpinner();
        },
        error: err => {
          const errorMessage = err?.error?.message || "Ocurrió un error inesperado.";
          this.swal.mostrarMensajeError("ERROR", errorMessage);
          this.ocultarSpinner();
        }
      })
    } 
    else
    {
      this.formModificarEmpleado.markAllAsTouched();
    }

  }

  resetearFormModificarEmpleado()
  {
    this.formModificarEmpleado.reset({
      desarrollador: "",
      idArea: ""
    });
  }

  mostrarSpinner()
  {
    this.claseSpinner = "spinner-activado";
  }

  ocultarSpinner()
  {
    this.claseSpinner = "spinner-desactivado";
  }



  get nombre()
  {
    return this.formModificarEmpleado.get('nombre');
  }

  get apellido()
  {
    return this.formModificarEmpleado.get('apellido');
  }

  get dni()
  {
    return this.formModificarEmpleado.get('dni');
  }

  get descripcion()
  {
    return this.formModificarEmpleado.get('descripcion');
  }

  get desarrollador()
  {
    return this.formModificarEmpleado.get('desarrollador');
  }

  get idArea()
  {
    return this.formModificarEmpleado.get('idArea');
  }

  get fechaNacimiento()
  {
    return this.formModificarEmpleado.get('fechaNacimiento');
  }
}
