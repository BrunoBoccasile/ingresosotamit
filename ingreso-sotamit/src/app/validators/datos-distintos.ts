import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function valoresDistintosValidator(
  dni: any,
  nombre: any,
  fechaNacimiento: any,
  descripcion: any,
  desarrollador: any,
  idArea: any
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control || !control.value) {
      return null;
    }

    const formValues = control.value;
    const valoresProhibidos: Record<string, any> = { dni, nombre, fechaNacimiento, descripcion, desarrollador, idArea };

    for (const key of Object.keys(valoresProhibidos)) {
      if (formValues[key] === valoresProhibidos[key]) {
        return { valoresDistintos: `Hay campos que se repiten.` };
      }
    }
    return null;
  };
}