import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaEmpleadosComponent } from './tabla-empleados.component';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';

describe('TablaEmpleadosComponent', () =>
{
    let component: TablaEmpleadosComponent;
    let fixture: ComponentFixture<TablaEmpleadosComponent>;

    beforeEach(async () =>
    {
        await TestBed.configureTestingModule({
            imports: [TablaEmpleadosComponent, HttpClientModule]
        })
            .compileComponents();
    });

    it('Debe crear el componente', () =>
    {
        const fixture = TestBed.createComponent(TablaEmpleadosComponent);
        const component = fixture.componentInstance;
        expect(component).toBeTruthy();
    });

    it('Debe ser form inválido por campos vacíos', () =>
    {
        const fixture = TestBed.createComponent(TablaEmpleadosComponent);
        const component = fixture.componentInstance;
        fixture.detectChanges();

        const form = component.formModificarEmpleado;

        expect(form.invalid).toBeTrue();
    });

    it('Debe ser form válido', () =>
    {
        const fixture = TestBed.createComponent(TablaEmpleadosComponent);
        const component = fixture.componentInstance;
        fixture.detectChanges();

        const form = component.formModificarEmpleado;
        form.controls['nombre'].setValue("fulanito");

        expect(form.valid).toBeTrue();
    });


    it('Debe ser form inválido si el DNI está fuera de rango', () =>
    {
        const fixture = TestBed.createComponent(TablaEmpleadosComponent);
        const component = fixture.componentInstance;
        fixture.detectChanges();

        const form = component.formModificarEmpleado;
        form.controls['dni'].setValue(999999999999999);
        expect(form.controls['dni'].invalid).toBeTrue();
        expect(form.controls['dni'].hasError('max')).toBeTrue();
    });

    it('Debe ser form inválido si el DNI es menor que 1', () =>
    {
        const fixture = TestBed.createComponent(TablaEmpleadosComponent);
        const component = fixture.componentInstance;
        fixture.detectChanges();

        const form = component.formModificarEmpleado;
        form.controls['dni'].setValue(0);
        expect(form.controls['dni'].invalid).toBeTrue();
        expect(form.controls['dni'].hasError('min')).toBeTrue();
    });



    it('Debe ser inválido si el nombre tiene más de 50 caracteres', () =>
    {
        const fixture = TestBed.createComponent(TablaEmpleadosComponent);
        const component = fixture.componentInstance;
        fixture.detectChanges();

        const form = component.formModificarEmpleado;
        let nombreDePrueba = "";
        for (let i = 0; i < 51; i++)
        {
            nombreDePrueba = nombreDePrueba + "a";
        }
        form.controls['nombre'].setValue(nombreDePrueba);
        expect(form.controls['nombre'].invalid).toBeTrue();
        expect(form.controls['nombre'].hasError('pattern')).toBeTrue();
    });

    it('Debe ser form inválido si el nombre tiene caracteres inválidos', () =>
    {
        const fixture = TestBed.createComponent(TablaEmpleadosComponent);
        const component = fixture.componentInstance;
        fixture.detectChanges();

        const form = component.formModificarEmpleado;
        form.controls['nombre'].setValue("$ejemplo");
        expect(form.controls['nombre'].invalid).toBeTrue();
        expect(form.controls['nombre'].hasError('pattern')).toBeTrue();
    });


    it('Debe ser form inválido si es menor de edad', () =>
    {
        const fixture = TestBed.createComponent(TablaEmpleadosComponent);
        const component = fixture.componentInstance;
        fixture.detectChanges();

        const form = component.formModificarEmpleado;
        form.controls['fechaNacimiento'].setValue("2025-01-01");
        expect(form.controls['fechaNacimiento'].invalid).toBeTrue();
    });


    it('Debe ser form inválido si la descripción tiene más de 100 caracteres', () =>
    {
        const fixture = TestBed.createComponent(TablaEmpleadosComponent);
        const component = fixture.componentInstance;
        fixture.detectChanges();

        const form = component.formModificarEmpleado;
        let descripcionDePrueba = "";
        for (let i = 0; i < 101; i++)
        {
            descripcionDePrueba = descripcionDePrueba + "a";
        }
        form.controls['descripcion'].setValue(descripcionDePrueba);
        expect(form.controls['descripcion'].invalid).toBeTrue();
        expect(form.controls['descripcion'].hasError('maxlength')).toBeTrue();
    });

    it('Debe seleccionar un empleado', () =>
        {
            const fixture = TestBed.createComponent(TablaEmpleadosComponent);
            const component = fixture.componentInstance;
            component.empleados = [
                {
                    id: 1,
                    nombre: "fulanito"
                },
                {
                    id: 2,
                    nombre: "menganito"
                }
            ]

            component.seleccionarEmpleado(2);
            expect(component.empleadoSeleccionado).toEqual(component.empleados[1])
    
            
        });
});
