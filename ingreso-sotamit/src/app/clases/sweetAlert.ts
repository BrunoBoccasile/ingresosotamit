import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { EnvironmentProviders, Injector } from '@angular/core';

export class SweetAlert{
    constructor(){}

    public mostrarMensajeError(titulo: string, mensaje: string)
    {
      Swal.fire({
        icon: "error",
        title: titulo,
        text: mensaje, 
        confirmButtonText: "ENTENDIDO",
        confirmButtonColor: "#0d6efd",
      });
    }

    public mostrarMensajeExito(titulo: string, mensaje: string)
    {
      Swal.fire({
        title: titulo,
        text: mensaje,
        icon: "success",
        confirmButtonText: "HECHO",
        confirmButtonColor: "#0e8c7e",
        allowOutsideClick: false,
        allowEscapeKey: false
      });
    }

    public mostrarMensajeWarning(titulo: string, mensaje: string)
    {
      Swal.fire({
        title: titulo,
        text: mensaje,
        icon: "warning",
        confirmButtonText: "Ok",
        allowOutsideClick: false,
        allowEscapeKey: false
      });
    }

    public mostrarMensajeConfirmar(titulo: string, mensaje: string)
    {
      return Swal.fire({
        title: titulo,
        text: mensaje,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0e8c7e",
        cancelButtonColor: "#adb5bd",
        confirmButtonText: "CONFIRMAR",
        cancelButtonText: "CANCELAR"
      });
    }
}
export declare function provideSwal(fn: (injector: Injector) => SweetAlert, ...deps: any[]): EnvironmentProviders;


