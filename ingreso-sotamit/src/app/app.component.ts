import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { CrearEmpleadoComponent } from "./componentes/crear-empleado/crear-empleado.component";
import { ListarEmpleadosComponent } from './componentes/listar-empleados/listar-empleados.component';
import { HttpClientModule } from '@angular/common/http';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgClass, RouterOutlet, CrearEmpleadoComponent, ListarEmpleadosComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ingreso-gotam';
  public navegacion: number;

  constructor(public router: Router) 
  {
    this.navegacion = 0;
  }

  public navegar(opcion: number){
    this.navegacion = opcion;
  }
}
