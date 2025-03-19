
<!-- <a name="readme-top"></a> -->

<br />
<div align="center">
  <a>
  </a>
  <br />  <br />  <br />
  <h1 align="center">Challenge de Ingreso SOTAMIT</h1>

  <p align="center">
    Gobierno de la Ciudad de Buenos Aires
  </p>
</div>


<br />
<br />


<!-- ABOUT THE PROJECT -->
## Sobre el proyecto

Este proyecto Full-Stack, desarrollado como challenge técnico para SOTAMIT, consiste en un CRUD de Empleados. El sitio web ofrece al usuario una interfaz intuitiva y amigable para la creación y administración de empleados.

### Tecnologías empleadas en el Front-End

* [![Angular][angular_img]][angular_url] (17.3.12)
* [![Ts][ts_img]][ts_url]
* [![Bootstrap][bootstrap_img]][bootstrap_link]


### Tecnologías empleadas en el Back-End

* [![MySQL][mysql_img]][mysql_url]
* [![NodeJS][nodejs_img]][nodejs_url] (22.14.0)
* [![ExpressJS][expressjs_img]][expressjs_url]

### Paquetes instalados:
##### BACK-END:
• express<br>
• nodemon<br>
• mysql2<br>
• dotenv<br>
• express-validator<br>
• vitest<br>
• supertest<br>
• swagger-ui-express<br>

##### FRONT-END:
• bootstrap<br>
• sweetalert2<br>

### Base de datos
#### Selección
Elegí MySQL por los siguientes motivos:<br>
• Para un proyecto con datos bien estructurados (usuarios, roles, productos, etc.) MySQL es ideal por su  modelo relacional. <br>
• Garantiza integridad referencial con claves primarias y foráneas, lo que ayuda a mantener la coherencia de los datos.<br>
• MySQL es una de las bases de datos más utilizadas en el mundo, lo que garantiza gran soporte y una comunidad activa.<br>
• MySQL cuenta con paquetes bien optimizados como mysql2, lo que facilita la integración con Node.js.

#### Querys para la creación de las bases de datos, tablas e inserciones

<strong>Tabla de producción</strong>

```
CREATE SCHEMA gotamdb;

USE gotamdb;

CREATE TABLE areas(  id INT NOT NULL AUTO_INCREMENT,     nombre VARCHAR(50) NOT NULL,     CONSTRAINT pk_area PRIMARY KEY (id));

CREATE TABLE empleados(
	id INT AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    dni INT NOT NULL,
    nacimiento DATE NOT NULL,
    desarrollador BOOLEAN NOT NULL,
    descripcion VARCHAR(100) NOT NULL,
    id_area INT NOT NULL,
    estado BOOLEAN NOT NULL DEFAULT 1,
    CONSTRAINT pk_empleado PRIMARY KEY (id),
	CONSTRAINT fk_empleado_area FOREIGN KEY (id_area) REFERENCES areas (id));

INSERT INTO areas (nombre) VALUES ('desarrollo');

INSERT INTO empleados (nombre, dni, nacimiento, desarrollador, descripcion, id_area) VALUES 
('Juan Perez', 1234567, '2003-03-03', 1, "Programador Full-Stack", 1);
```

<strong>Tabla de testing</strong>

```
CREATE SCHEMA gotamdb_test;
USE gotamdb_test;
```
(utilicé las mismas querys que en producción para crear las tablas y sus inserciones)

#### Diagarma de entidad relación

![](https://github.com/BrunoBoccasile/ingresosotamit/blob/master/imagenes-readme/der.png)


## Creador

### [![Github][github_img]][github_link_bruno] Bruno Boccasile


## Vistas previas de la aplicación

### Barra de navegación
A través de esta navbar, el usuario puede navegar entre los componentes Creación de empleado y Listado de empleados. También, si presiona en el sector donde dice "Hecho por Bruno Boccasile", se desplegará un modal en donde se brinda una breve descripción del proyecto y un enlace a mi GitHub.
<br>
![](https://github.com/BrunoBoccasile/ingresosotamit/blob/master/imagenes-readme/pantalla-0.png)
![](https://github.com/BrunoBoccasile/ingresosotamit/blob/master/imagenes-readme/pantalla-1.png)

### Creación de empleado
Ingresando campos válidos, el usuario puede dar de alta a un empleado presionando el botón CREAR.
<br>
![](https://github.com/BrunoBoccasile/ingresosotamit/blob/master/imagenes-readme/pantalla-2.png)

### Listado de empleados
A través de esta sección, el usuario puede observar y gestionar un listado de empleados. Para modificar o  eliminar, debe clickear sobre un empleado y se desplegará un modal con los detalles del empleado, con botones para realizar las correspondientes acciones.
<br>
![](https://github.com/BrunoBoccasile/ingresosotamit/blob/master/imagenes-readme/pantalla-3.png)
![](https://github.com/BrunoBoccasile/ingresosotamit/blob/master/imagenes-readme/pantalla-4.png)
![](https://github.com/BrunoBoccasile/ingresosotamit/blob/master/imagenes-readme/pantalla-5.png)
![](https://github.com/BrunoBoccasile/ingresosotamit/blob/master/imagenes-readme/pantalla-6.png)

## Endpoints del Back-End
Cada endpoint está documentado con Swagger.

#### /empleados/
GET --> Empleado por id<br>
GET --> Todos los empleados<br>
DELETE --> Elimina empleado por id (baja lógica)<br>
PATCH --> Modifica empleado por id (uno o más campos)<br>
POST --> Crea un nuevo empleado<br>

#### /areas/
GET --> Todas las areas<br>

#### Toda la documentación está visible en la ruta <strong>http://localhost:3000/api-docs/</strong>
![](https://github.com/BrunoBoccasile/ingresosotamit/blob/master/imagenes-readme/pantalla-7.png)

## Cómo utilizar la aplicación
• Se deben crear las base de datos correspondientes en MySQL, editar variables de credenciales en el proyecto de NodeJS de ser necesario<br>
• Estando en la ruta del proyecto de la API de NodeJS, ejecutar "npm run dev", lo que hará que el servidor se inicie localmente en el puerto 3000.<br>
Estando en la ruta del proyecto de Angular, ejecutar "ng serve -o", lo cual iniciará el sitio web en el puerto 4200 y lo abrirá una pestaña nueva.<br>
• Para realizar el testing unitario del Back-End, ejecutar npm run test estando en la ruta del proyecto de NodeJS.<br>
• Para realizar el testing unitario del Front-End, ejecutar ng test estando en la ruta del proyecto de Angular.<br>

## Tiempo de realización por cada tarea (aproximación)
• Back-End: 9 horas<br>
• Creación de base de datos: 0.5 horas<br>
• Front-End: 20 horas<br>
• Tests unitarios Front-End: 3 horas<br>
• Test unitarios Back-End: 4 horas<br>
• Documentación endpoints: 2 horas<br>
• README: 2 horas<br>

## Ramas
### Rama de producción
* master



<!-- MARKDOWN LINKS & IMAGES -->
[github_img]: https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white

[github_link_bruno]: https://github.com/BrunoBoccasile
[bootstrap_img]: https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white
[bootstrap_link]: https://getbootstrap.com/
[angular_img]: https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white
[angular_url]: https://angular.dev/
[ts_img]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[ts_url]: https://www.typescriptlang.org/
[mysql_img]: https://img.shields.io/badge/MySQL-lightgrey?logo=mysql&style=plastic&logoColor=white&labelColor=blue
[mysql_url]: https://www.mysql.com/
[nodejs_img]: https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white
[nodejs_url]: https://nodejs.org/en
[expressjs_img]: https://img.shields.io/badge/express.js-000000?style=for-the-badge&logo=express&logoColor=white
[expressjs_url]: https://expressjs.com/
