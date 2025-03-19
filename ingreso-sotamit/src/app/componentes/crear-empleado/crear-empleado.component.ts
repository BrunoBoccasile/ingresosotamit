import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { mayorDeEdadValidator } from '../../validators/mayor-de-edad';
import { Subscription } from 'rxjs';
import { ConexionApiService } from '../../servicios/conexion-api.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { NgClass } from '@angular/common';
import { SweetAlert } from '../../clases/sweetAlert';

@Component({
  selector: 'app-crear-empleado',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, SpinnerComponent, NgClass],
  templateUrl: './crear-empleado.component.html',
  styleUrl: './crear-empleado.component.css'
})
export class CrearEmpleadoComponent implements OnInit
{
  formCrearEmpleado!: FormGroup;
  suscripcionAreas!: Subscription;
  areas!: any;
  public swal = new SweetAlert();
  public errorEnLaSolicitud = false;

  public claseSpinner = "spinner-desactivado";

  constructor(public fb: FormBuilder, private conexionApiService: ConexionApiService)
  {
  }

  ngOnInit(): void
  {
    this.mostrarSpinner();
    this.formCrearEmpleado = this.fb.group({
      dni: ['', [Validators.min(1), Validators.max(2147483647), Validators.required]],
      nombre: ['', [Validators.pattern("^[A-Za-zÁÉÍÓÚáéíóúÑñÜü -]{1,50}$"), Validators.required]],      
      fechaNacimiento: ['', [Validators.required, mayorDeEdadValidator()], ],
      descripcion: ['', [Validators.maxLength(100), Validators.required]],
      desarrollador: ['', [Validators.required]],
      idArea: ['', [Validators.required]]
    })

    this.suscripcionAreas = this.conexionApiService.getAreas()
    .subscribe({
      next: (data: any) => {
        if (data.status == "OK") {
          this.areas = data.areas;   
          this.ocultarSpinner();
       
        }
      },
      error: err => {
        this.formCrearEmpleado?.disable();
        const errorMessage = err?.error?.message || "Ocurrió un error inesperado, intente recargando la página.";
        this.swal.mostrarMensajeError("ERROR", errorMessage)
        this.ocultarSpinner();   
      }
    });
  }
  

  enviarFormCrearEmpleado()
  {
    if (this.formCrearEmpleado.valid)
    {
      this.mostrarSpinner();

      let empleado = {
        nombre: this.nombre?.value, 
        dni: this.dni?.value,
        nacimiento: this.fechaNacimiento?.value,
        descripcion: this.descripcion?.value,
        id_area: this.idArea?.value,
        desarrollador: this.desarrollador?.value
      };

      this.conexionApiService.crearEmpleado(empleado).subscribe({
        next: (data: any) => {
          console.log(data);
          this.swal.mostrarMensajeExito("Operación exitosa", "El empleado fue creado exitosamente.")
          this.resetearFormCrearEmpleado();
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
      this.formCrearEmpleado.markAllAsTouched();
    }

  }

  resetearFormCrearEmpleado()
  {
    this.formCrearEmpleado.reset({
      desarrollador: "",
      idArea: ""
    });
  }

  get nombre()
  {
    return this.formCrearEmpleado.get('nombre');
  }


  get dni()
  {
    return this.formCrearEmpleado.get('dni');
  }

  get descripcion()
  {
    return this.formCrearEmpleado.get('descripcion');
  }

  get desarrollador()
  {
    return this.formCrearEmpleado.get('desarrollador');
  }
  
  get idArea()
  {
    return this.formCrearEmpleado.get('idArea');
  }

  get fechaNacimiento()
  {
    return this.formCrearEmpleado.get('fechaNacimiento');
  }

  mostrarSpinner()
{
  this.claseSpinner = "spinner-activado";
}

ocultarSpinner()
{
  this.claseSpinner = "spinner-desactivado";
}
}
