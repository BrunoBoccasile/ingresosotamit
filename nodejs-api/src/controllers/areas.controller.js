import { pool } from "../db.js";

export const getAreas = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM areas");
            if (result.length <= 0) return res.status(404).json({
                message: "No hay áreas",
                status: "ERROR"
            })

            res.status(200).json({
                message: "Áreas obtenidas exitosamente",
                status: "OK",
                areas: result
            });
    } catch (error) {
        return res.status(500).json({
            message: "Algo salió mal",
            status: "ERROR"
        })
    }
};