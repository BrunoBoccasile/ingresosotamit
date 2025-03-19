import { pool } from "../db.js";

export const getEmpleados = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM empleados WHERE estado != 0");
        if (result.length <= 0) return res.status(404).json({
            message: "No hay empleados",
            status: "ERROR"
        })

        res.status(200).json({
            message: "Empleados obtenidos exitosamente",
            status: "OK",
            empleados: result
        });
    } catch (error) {
        return res.status(500).json({
            message: "Algo salió mal",
            status: "ERROR"
        })
    }
};

export const getEmpleado = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM empleados WHERE id = ? AND estado != 0", [req.params.id]);
        if (result.length <= 0) return res.status(404).json({
            message: "Empleado no encontrado",
            status: "ERROR"
        })

        res.status(200).json({
            message: "Empleado obtenido exitosamente",
            status: "OK",
            empleado: result[0]
        });
    } catch (error) {
        return res.status(500).json({
            message: "Algo salió mal",
            status: "ERROR"
        })
    }
};


export const createEmpleado = async (req, res) => {
    const { nombre, dni, nacimiento, desarrollador, descripcion, id_area } = req.body;

    try {
        const [area] = await pool.query("SELECT * FROM areas WHERE id = ?", [id_area]);

        if (area.length === 0) {
            return res.status(404).json({ message: "El ID de área ingresado no existe" });
        }

        const [result] = await pool.query(
            "INSERT INTO empleados (nombre, dni, nacimiento, desarrollador, descripcion, id_area) VALUES (?, ?, ?, ?, ?, ?)",
            [nombre, dni, nacimiento, desarrollador, descripcion, id_area]
        );

        res.status(200).json({
            message: "Empleado creado exitosamente",
            status: "OK",
            id: result.insertId
        });

    } catch (error) {
        console.error("Error en createEmpleado:", error);
        res.status(500).json({
            message: "Algo salió mal",
            status: "ERROR"
        });
    }
};


export const deleteEmpleado = async (req, res) => {
    try {
        const [result] = await pool.query("UPDATE empleados SET estado = 0 WHERE ID = ? AND estado = 1", [req.params.id]);

        if (result.affectedRows == 0) return res.status(404).json({
            message: "Empleado no encontrado",
            status: "ERROR"
        })

        res.status(200).json({
            message: "Empleado dado de baja exitosamente",
            status: "OK"
        });

    } catch (error) {
        console.error("Error en deleteEmpleado:", error);
        res.status(500).json({
            message: "Algo salió mal",
            status: "ERROR"
        });
    }
};


export const updateEmpleado = async (req, res) => {
    const { id } = req.params;
    const { nombre, dni, nacimiento, desarrollador, descripcion, id_area } = req.body;
    try {
        const [area] = await pool.query("SELECT * FROM areas WHERE id = IFNULL(?, id)", [id_area]);


        if (area.length === 0) {
            return res.status(404).json({ message: "El ID de área ingresado no existe" });
        }

        const [result] = await pool.query(
            "UPDATE empleados SET nombre = IFNULL(?, nombre), dni = IFNULL(?, dni), nacimiento = IFNULL(?, nacimiento), desarrollador = IFNULL(?, desarrollador), descripcion = IFNULL(?, descripcion), id_area = IFNULL(?, id_area) WHERE id = ?",
            [nombre, dni, nacimiento, desarrollador, descripcion, id_area, id]
        );

        console.log(result);
        if (result.affectedRows == 0) return res.status(404).json({
            message: "Empleado no encontrado",
            status: "ERROR"
        })
        res.status(200).json({
            message: "Empleado modificado exitosamente",
            status: "OK"
        });

    } catch (error) {
        console.error("Error en updateEmpleado:", error);
        res.status(500).json({
            message: "Algo salió mal",
            status: "ERROR"
        });
    }
};
