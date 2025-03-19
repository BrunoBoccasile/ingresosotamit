import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { ConexionApiService } from './conexion-api.service';

describe('ConexionApiService', () =>
{
    let service: ConexionApiService;
    let httpClientSpy: jasmine.SpyObj<HttpClient>;

    beforeEach(() =>
    {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'patch', 'delete']);

        TestBed.configureTestingModule({
            providers: [
                ConexionApiService,
                { provide: HttpClient, useValue: httpClientSpy }
            ]
        });

        service = TestBed.inject(ConexionApiService);
    });

    it('Debe obtener un empleado por ID', (done: DoneFn) =>
    {
        const mockRespuesta = {
            message: "Empleado obtenido exitosamente",
            status: "OK",
            empleado: {
                id: 1,
                nombre: "Fulanito",
                dni: 123456,
                nacimiento: "2003-07-07",
                descripcion: "test",
                id_area: 1,
                desarrollador: 1
            }
        };

        httpClientSpy.get.and.returnValue(of(mockRespuesta));

        service.getEmpleado(1).subscribe(res =>
        {
            expect(res).toEqual(jasmine.objectContaining({
                message: jasmine.any(String),
                status: jasmine.any(String),
                empleado: jasmine.objectContaining({
                    id: jasmine.any(Number),
                    nombre: jasmine.any(String),
                    dni: jasmine.any(Number),
                    nacimiento: jasmine.any(String),
                    descripcion: jasmine.any(String),
                    id_area: jasmine.any(Number),
                    desarrollador: jasmine.any(Number)
                })
            }));
            done();
        });

        expect(httpClientSpy.get).toHaveBeenCalledWith('http://localhost:3000/empleados/1');
    });


    it('Debe obtener una lista de empleados', (done: DoneFn) =>
    {
        const mockRespuesta = {
            message: "Empleados obtenidos exitosamente",
            status: "OK",
            empleados:
                [
                    {
                        id: 1,
                        nombre: "Fulanito",
                        dni: 123456,
                        nacimiento: "2003-07-07",
                        descripcion: "test",
                        id_area: 1,
                        desarrollador: 1
                    },
                    {
                        id: 2,
                        nombre: "Menganito",
                        dni: 123456,
                        nacimiento: "2003-07-07",
                        descripcion: "test",
                        id_area: 2,
                        desarrollador: 1
                    }
                ]
        };

        httpClientSpy.get.and.returnValue(of(mockRespuesta));

        service.getEmpleados().subscribe(res =>
        {
            expect(res).toEqual(jasmine.objectContaining({
                message: jasmine.any(String),
                status: jasmine.any(String),
                empleados: jasmine.arrayContaining([{
                    id: jasmine.any(Number),
                    nombre: jasmine.any(String),
                    dni: jasmine.any(Number),
                    nacimiento: jasmine.any(String),
                    descripcion: jasmine.any(String),
                    id_area: jasmine.any(Number),
                    desarrollador: jasmine.any(Number)
                }])
            }));
            done();
        });

        expect(httpClientSpy.get).toHaveBeenCalledWith('http://localhost:3000/empleados/');
    });

    it('Debe crear un empleado', (done: DoneFn) =>
    {
        let mockEmpleado = {
            id: 1,
            nombre: "Fulanito",
            dni: 123456,
            nacimiento: "2003-07-07",
            descripcion: "test",
            id_area: 1,
            desarrollador: 1
        }

        const mockRespuesta = {
            message: "Empleado creado exitosamente",
            status: "OK",
        };

        httpClientSpy.post.and.returnValue(of(mockRespuesta));

        service.crearEmpleado(mockEmpleado).subscribe(res =>
        {
            expect(res).toEqual(jasmine.objectContaining({
                message: jasmine.any(String),
                status: jasmine.any(String)
            }));
            done();
        });

        expect(httpClientSpy.post).toHaveBeenCalledWith('http://localhost:3000/empleados/', mockEmpleado,
            jasmine.objectContaining({
                headers: { 'Content-Type': 'application/json' }
            }));
    });

    it('Debe modificar un empleado', (done: DoneFn) =>
        {
            let mockEmpleado = {
                nombre: "Menganito"
            }
    
            const mockRespuesta = {
                message: "Empleado modificado exitosamente",
                status: "OK",
            };
    
            httpClientSpy.patch.and.returnValue(of(mockRespuesta));
    
            service.modificarEmpleado(1, mockEmpleado).subscribe(res =>
            {
                expect(res).toEqual(jasmine.objectContaining({
                    message: jasmine.any(String),
                    status: jasmine.any(String)
                }));
                done();
            });
    
            expect(httpClientSpy.patch).toHaveBeenCalledWith('http://localhost:3000/empleados/' + 1, mockEmpleado,
                jasmine.objectContaining({
                    headers: { 'Content-Type': 'application/json' }
                }));
        });

        it('Debe eliminar un empleado', (done: DoneFn) =>
            {        
                const mockRespuesta = {
                    message: "Empleado eliminado exitosamente",
                    status: "OK",
                };
        
                httpClientSpy.delete.and.returnValue(of(mockRespuesta));
        
                service.eliminarEmpleado(1).subscribe(res =>
                {
                    expect(res).toEqual(jasmine.objectContaining({
                        message: jasmine.any(String),
                        status: jasmine.any(String)
                    }));
                    done();
                });
        
                expect(httpClientSpy.delete).toHaveBeenCalledWith('http://localhost:3000/empleados/' + 1);
            });

            it('Debe obtener una lista de areas', (done: DoneFn) =>
                {
                    const mockRespuesta = {
                        message: "Areas obtenidas exitosamente",
                        status: "OK",
                        areas:
                            [
                                {
                                    id: 1,
                                    nombre: "desarrollo"
                                },
                                {
                                    id: 2,
                                    nombre: "qa"
                                }
                            ]
                    };
            
                    httpClientSpy.get.and.returnValue(of(mockRespuesta));
            
                    service.getAreas().subscribe(res =>
                    {
                        expect(res).toEqual(jasmine.objectContaining({
                            message: jasmine.any(String),
                            status: jasmine.any(String),
                            areas: jasmine.arrayContaining([{
                                id: jasmine.any(Number),
                                nombre: jasmine.any(String),
                            }])
                        }));
                        done();
                    });
            
                    expect(httpClientSpy.get).toHaveBeenCalledWith('http://localhost:3000/areas/');
                });
});