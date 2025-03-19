import { Router } from "express";
import { getEmpleados, getEmpleado, createEmpleado, updateEmpleado, deleteEmpleado } from "../controllers/empleados.controller.js";
import { validateCreate, validateUpdate } from "../validators/empleados.js";
// import { validateJson } from "../validators/json.js";
const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Empleado:
 *       type: object
 *       required:
 *         - nombre
 *         - dni
 *         - nacimiento
 *         - desarrollador
 *         - descripcion
 *         - id_area
 *       properties:
 *         id:
 *           type: integer
 *           description: El id auto generado de Empleado
 *         nombre:
 *           type: string
 *           description: El nombre del empleado
 *         dni:
 *           type: string
 *           description: El DNI del empleado
 *         nacimiento:
 *           type: string
 *           format: date-time
 *           description: La fecha de nacimiento del empleado
 *         desarrollador:
 *           type: integer
 *           description: Si el empleado es un desarrollador (1 para true, 0 para false)
 *         descripcion:
 *           type: string
 *           description: Una descripción del empleado
 *         id_area:
 *           type: integer
 *           description: El id del area a la que pertenece
 *         estado:
 *           type: integer
 *           description: El estado del empleado (1 para activo, 0 para inactivo)
 *       example:
 *         id: 1
 *         nombre: "Bruno Boccasile"
 *         dni: 44969247
 *         nacimiento: "2003-07-19T03:00:00.000Z"
 *         desarrollador: 1
 *         descripcion: "Creador del proyecto"
 *         id_area: 1
 *         estado: 1
 */

/**
 * @swagger
 * tags:
 *   name: Empleados
 *   description: API de CRUD de empleados
 */

/**
 * @swagger
 * /empleados:
 *   get:
 *     summary: Retorna la lista de todos los empleados
 *     tags: [Empleados]
 *     responses:
 *       200:
 *         description: La lista de todos los empleados
 *         content:
 *           application/json:
 *              schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Empleados obtenidos exitosamente"
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 empleados:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Empleado'
 *       404:
 *         description: No hay empleados para retornar
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No hay empleados"
 *                 status:
 *                   type: string
 *                   example: "ERROR"
 *       500:
 *         description: Ocurrió un error inesperado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Algo salió mal"
 *                 status:
 *                   type: string
 *                   example: "ERROR"
 */
 

router.get("/empleados", getEmpleados);

/**
 * @swagger
 * /empleados/{id}:
 *   get:
 *     summary: Retorna un empleado por id
 *     tags: [Empleados]
 *     parameters:
 *     - in: path
 *     name: id
 *     schema:
 *       type: integer
 *     required: true
 *     description: El id del empleado
 *     responses:
 *       200:
 *         description: Los datos del empleado por id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                      type: string
 *                      example: "Empleado obtenido exitosamente"
 *                  status:
 *                      type: string
 *                      example: "OK"
 *                  empleado:
 *                       $ref: '#/components/schemas/Empleado'
 *       404:
 *         description: El empleado no se pudo encontrar
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Empleado no encontrado"
 *                 status:
 *                   type: string
 *                   example: "ERROR"
 *       500:
 *         description: Ocurrió un error inesperado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Algo salió mal"
 *                 status:
 *                   type: string
 *                   example: "ERROR"
 */
router.get("/empleados/:id", getEmpleado);

/**
 * @swagger
 * /empleados:
 *   post:
 *     summary: Crea un nuevo empleado
 *     tags: [Empleados]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: El nombre del empleado
 *                 example: "Bruno Boccasile"
 *               dni:
 *                 type: string
 *                 description: El DNI del empleado
 *                 example: 123456
 *               nacimiento:
 *                 type: string
 *                 format: date-time
 *                 description: La fecha de nacimiento del empleado
 *                 example: "2003-07-19T03:00:00.000Z"
 *               desarrollador:
 *                 type: integer
 *                 description: Si el empleado es un desarrollador (1 para sí, 0 para no)
 *                 example: 1
 *               descripcion:
 *                 type: string
 *                 description: Descripción del empleado
 *                 example: "Creador del proyecto"
 *               id_area:
 *                 type: integer
 *                 description: El id del área a la que pertenece
 *                 example: 1
 *             required:
 *               - nombre
 *               - dni
 *               - nacimiento
 *               - desarrollador
 *               - descripcion
 *               - id_area
 *     responses:
 *       200:
 *         description: El empleado fue creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Empleado creado exitosamente"
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 empleado:
 *                   type: object
 *                   properties:
 *                     nombre:
 *                       type: string
 *                       example: "Bruno Boccasile"
 *                     dni:
 *                       type: string
 *                       example: "44969247"
 *                     nacimiento:
 *                       type: string
 *                       format: date-time
 *                       example: "2003-07-19T03:00:00.000Z"
 *                     desarrollador:
 *                       type: integer
 *                       example: 1
 *                     descripcion:
 *                       type: string
 *                       example: "Creador del proyecto"
 *                     id_area:
 *                       type: integer
 *                       example: 1
 *                   required:
 *                     - nombre
 *                     - dni
 *                     - nacimiento
 *                     - desarrollador
 *                     - descripcion
 *                     - id_area
 *       404:
 *         description: El id de area ingresado es invalida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "El ID de área ingresado no existe"
 *                 status:
 *                   type: string
 *                   example: "ERROR"
 *       500:
 *         description: Ocurrió un error inesperado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Algo salió mal"
 *                 status:
 *                   type: string
 *                   example: "ERROR"
 *       400:
 *         description: Campos ingresados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "El valor del campo 'nacimiento' debe ser una fecha válida"
 *                 status:
 *                   type: string
 *                   example: "ERROR"
 */
router.post("/empleados", validateCreate, createEmpleado);

/**
 * @swagger
 * /empleados/{id}:
 *   patch:
 *     summary: Modifica un empleado
 *     tags: [Empleados]
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: integer
 *       required: true
 *       description: El id del empleado
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: El nombre del empleado
 *                 example: "Bruno Martinez"
 *               dni:
 *                 type: string
 *                 description: El DNI del empleado
 *                 example: "44969247"
 *               nacimiento:
 *                 type: string
 *                 format: date-time
 *                 description: La fecha de nacimiento del empleado
 *                 example: "2003-07-19"
 *               desarrollador:
 *                 type: integer
 *                 description: Si el empleado es un desarrollador (1 para sí, 0 para no)
 *                 example: 1
 *               descripcion:
 *                 type: string
 *                 description: Descripción del empleado
 *                 example: "Creador del proyecto"
 *               id_area:
 *                 type: integer
 *                 description: El id del área a la que pertenece
 *                 example: 1
 *     responses:
 *       200:
 *         description: El empleado fue modificado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Empleado modificado exitosamente"
 *                 status:
 *                   type: string
 *                   example: "OK"
 *       404:
 *         description: El empleado no existe o el id de área ingresado es inválido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Empleado no encontrado"
 *                 status:
 *                   type: string
 *                   example: "ERROR"
 *       500:
 *         description: Ocurrió un error inesperado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Algo salió mal"
 *                 status:
 *                   type: string
 *                   example: "ERROR"
 *       400:
 *         description: Campos ingresados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "El valor del campo 'nacimiento' debe ser una fecha válida"
 *                 status:
 *                   type: string
 *                   example: "ERROR"
 */
router.patch("/empleados/:id", validateUpdate, updateEmpleado);


/**
 * @swagger
 * /empleados/{id}:
 *   delete:
 *     summary: Elimina un empleado por ID (baja lógica)
 *     tags: [Empleados]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del empleado a eliminar
 *     responses:
 *       200:
 *         description: Empleado eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Empleado dado de baja exitosamente"
 *                 status:
 *                   type: string
 *                   example: "OK"
 *       404:
 *         description: El empleado no se pudo encontrar
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Empleado no encontrado"
 *                 status:
 *                   type: string
 *                   example: "ERROR"
 *       500:
 *         description: Ocurrió un error inesperado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Algo salió mal"
 *                 status:
 *                   type: string
 *                   example: "ERROR"
 */
router.delete("/empleados/:id", deleteEmpleado);

export default router;