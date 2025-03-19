import express from "express";
import {pool} from "./db.js";
import empleadosRoutes from "./routes/empleados.routes.js";
import indexRoutes from "./routes/index.routes.js";
import areasRoutes from "./routes/areas.routes.js";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import specs from "../swagger/swagger.js";

const app = express();


app.use(cors());
app.use("/api-docs",swaggerUI.serve, swaggerUI.setup(specs));
app.use(express.json());

app.get("/ping", async (req, res) => {
    const result = await pool.query("SELECT * FROM empleados");
    res.json(result);
});

app.use(empleadosRoutes);
app.use(areasRoutes);
app.use(indexRoutes);

app.use((req, res, next) => {
    res.status(404).json({
        message: "Endpoint inválido"
    }
    )
})

export default app;   