import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function mayorDeEdadValidator(): ValidatorFn
{
  return (control: AbstractControl): ValidationErrors | null =>
  {
    if (!control.value)
    {
      return null;
    }

    const fechaIngresada = new Date(control.value);
    if (isNaN(fechaIngresada.getTime()))
    {
      return { fechaInvalida: true };
    }

    const hoy = new Date();
    const edadMilisegundos = hoy.getTime() - fechaIngresada.getTime();
    const edadAnios = edadMilisegundos / (1000 * 60 * 60 * 24 * 365.25);

    return edadAnios >= 18 ? null : { menorDeEdad: true };
  };
}