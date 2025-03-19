import { Router } from "express";
import { getAreas } from "../controllers/areas.controller.js";
// import { validateJson } from "../validators/json.js";
const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Area:
 *       type: object
 *       required:
 *         - id
 *         - nombre
 *       properties:
 *         id:
 *           type: integer
 *           description: El ID auto generado del área
 *         nombre:
 *           type: string
 *           description: El nombre del área
 *       example:
 *         id: 1
 *         nombre: "Desarrollo"
 */

/**
 * @swagger
 * tags:
 *   name: Areas
 *   description: API de CRUD de áreas
 */

/**
 * @swagger
 * /areas:
 *   get:
 *     summary: Retorna la lista de todas las áreas
 *     tags: [Areas]
 *     responses:
 *       200:
 *         description: Lista de todas las áreas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Áreas obtenidas exitosamente"
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 areas:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Area'
 *       404:
 *         description: No hay áreas para retornar
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No hay áreas"
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
router.get("/areas", getAreas);

export default router;