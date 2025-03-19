import { AbstractControl, FormGroup, ValidatorFn } from "@angular/forms";

export function alMenosUnCampoRequeridoValidator(): ValidatorFn
{
  return (formGroup: AbstractControl) =>
  {
    const controls = formGroup as FormGroup;
    const tieneValor = Object.values(controls.controls).some(control => control.value && control.value.toString().trim() !== '');
    return tieneValor ? null : { alMenosUnCampoRequerido: true };
  };
}