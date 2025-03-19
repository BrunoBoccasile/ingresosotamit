import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SpinnerComponent } from '../spinner/spinner.component';
import { NgClass } from '@angular/common';
import { TablaEmpleadosComponent } from "../tabla-empleados/tabla-empleados.component";
@Component({
  selector: 'app-listar-empleados',
  standalone: true,
  imports: [FormsModule, SpinnerComponent, NgClass, TablaEmpleadosComponent],
  templateUrl: './listar-empleados.component.html',
  styleUrl: './listar-empleados.component.css'
})
export class ListarEmpleadosComponent
{
  
}
