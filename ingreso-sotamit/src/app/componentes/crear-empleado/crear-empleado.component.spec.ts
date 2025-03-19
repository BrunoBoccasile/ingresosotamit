import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { CrearEmpleadoComponent } from './crear-empleado.component';
import { By } from '@angular/platform-browser';

describe('CrearEmpleadoComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearEmpleadoComponent, HttpClientModule]
    })
    .compileComponents();
  });

  it('Debe crear el componente', () => {
    const fixture = TestBed.createComponent(CrearEmpleadoComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('Debe ser form inválido por campos vacíos', () => {
    const fixture = TestBed.createComponent(CrearEmpleadoComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const form = component.formCrearEmpleado;

    expect(form.invalid).toBeTrue();
  });

  it('Debe ser form válido', () => {
    const fixture = TestBed.createComponent(CrearEmpleadoComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const form = component.formCrearEmpleado;
    form.controls['nombre'].setValue("fulanito");
    form.controls['dni'].setValue("123456");
    form.controls['fechaNacimiento'].setValue("2003-07-07");
    form.controls['descripcion'].setValue("test");
    form.controls['idArea'].setValue("1");
    form.controls['desarrollador'].setValue("1");

    expect(form.valid).toBeTrue();
  });

  it('Debe ser form inválido si el DNI está fuera de rango', () => {
    const fixture = TestBed.createComponent(CrearEmpleadoComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const form = component.formCrearEmpleado;
    form.controls['dni'].setValue(999999999999999);
    expect(form.controls['dni'].invalid).toBeTrue();
    expect(form.controls['dni'].hasError('max')).toBeTrue();
  });

  it('Debe ser form inválido si el DNI es menor que 1', () => {
    const fixture = TestBed.createComponent(CrearEmpleadoComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const form = component.formCrearEmpleado;
    form.controls['dni'].setValue(0);
    expect(form.controls['dni'].invalid).toBeTrue();
    expect(form.controls['dni'].hasError('min')).toBeTrue();
  });

  it('Debe ser form inválido si el DNI está vacío', () => {
    const fixture = TestBed.createComponent(CrearEmpleadoComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const form = component.formCrearEmpleado;
    form.controls['dni'].setValue('');
    expect(form.controls['dni'].invalid).toBeTrue();
    expect(form.controls['dni'].hasError('required')).toBeTrue();
  });


  it('Debe ser inválido si el nombre tiene más de 50 caracteres', () => {
    const fixture = TestBed.createComponent(CrearEmpleadoComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const form = component.formCrearEmpleado;
    let nombreDePrueba = "";
    for(let i=0 ; i<51 ; i++)
    {
      nombreDePrueba = nombreDePrueba + "a";
    }
    form.controls['nombre'].setValue(nombreDePrueba);
    expect(form.controls['nombre'].invalid).toBeTrue();
    expect(form.controls['nombre'].hasError('pattern')).toBeTrue();
  });

  it('Debe ser form inválido si el nombre tiene caracteres inválidos', () => {
    const fixture = TestBed.createComponent(CrearEmpleadoComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const form = component.formCrearEmpleado;
    form.controls['nombre'].setValue("$ejemplo");
    expect(form.controls['nombre'].invalid).toBeTrue();
    expect(form.controls['nombre'].hasError('pattern')).toBeTrue();
  });

  it('Debe ser form inválido si el nombre está vacío', () => {
    const fixture = TestBed.createComponent(CrearEmpleadoComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const form = component.formCrearEmpleado;
    form.controls['nombre'].setValue('');
    expect(form.controls['nombre'].invalid).toBeTrue();
    expect(form.controls['nombre'].hasError('required')).toBeTrue();
  });


  it('Debe ser form inválido si es menor de edad', () => {
    const fixture = TestBed.createComponent(CrearEmpleadoComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const form = component.formCrearEmpleado;
    form.controls['fechaNacimiento'].setValue("2025-01-01");
    expect(form.controls['fechaNacimiento'].invalid).toBeTrue();
  });

  it('Debe ser form inválido si la fecha de nacimiento está vacía', () => {
    const fixture = TestBed.createComponent(CrearEmpleadoComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const form = component.formCrearEmpleado;
    form.controls['fechaNacimiento'].setValue('');
    expect(form.controls['fechaNacimiento'].invalid).toBeTrue();
    expect(form.controls['fechaNacimiento'].hasError('required')).toBeTrue();
  });

  it('Debe ser form inválido si la descripción tiene más de 100 caracteres', () => {
    const fixture = TestBed.createComponent(CrearEmpleadoComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const form = component.formCrearEmpleado;
    let descripcionDePrueba = "";
    for(let i=0 ; i<101; i++)
    {
      descripcionDePrueba = descripcionDePrueba + "a";
    }
    form.controls['descripcion'].setValue(descripcionDePrueba);
    expect(form.controls['descripcion'].invalid).toBeTrue();
    expect(form.controls['descripcion'].hasError('maxlength')).toBeTrue();
  });

  it('Debe ser form inválido si la descripción está vacía', () => {
    const fixture = TestBed.createComponent(CrearEmpleadoComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const form = component.formCrearEmpleado;
    form.controls['descripcion'].setValue('');
    expect(form.controls['descripcion'].invalid).toBeTrue();
    expect(form.controls['descripcion'].hasError('required')).toBeTrue();
  });

  it('Debe ser form inválido si el id del área está vacío', () => {
    const fixture = TestBed.createComponent(CrearEmpleadoComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const form = component.formCrearEmpleado;
    form.controls['idArea'].setValue('');
    expect(form.controls['idArea'].invalid).toBeTrue();
    expect(form.controls['idArea'].hasError('required')).toBeTrue();
  });

  it('Debe estar deshabilitado el botón de submit si el form es inválido', () => {
    const fixture = TestBed.createComponent(CrearEmpleadoComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const form = component.formCrearEmpleado;
    const btnSubmit = fixture.debugElement.query(By.css('#boton-submit')).nativeElement
    expect(form.invalid).toBeTrue();
    expect(btnSubmit.disabled).toBeTrue();
  });

  it('Debe estar habilitado el botón de submit si el form es válido', () => {
    const fixture = TestBed.createComponent(CrearEmpleadoComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const form = component.formCrearEmpleado;
    form.controls['nombre'].setValue("fulanito");
    form.controls['dni'].setValue("123456");
    form.controls['fechaNacimiento'].setValue("2003-07-07");
    form.controls['descripcion'].setValue("test");
    form.controls['idArea'].setValue("1");
    form.controls['desarrollador'].setValue("1");
    const btnSubmit = fixture.debugElement.query(By.css('#boton-submit')).nativeElement
    expect(form.valid).toBeTrue();
    expect(btnSubmit.disabled).toBeTrue();
  });
});
