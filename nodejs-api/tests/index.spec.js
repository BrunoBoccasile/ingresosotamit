import { describe, it, expect } from "vitest"
import app from "../src/app.js"
import request from "supertest"

describe('Endpoints de /areas', () => {

    it('Debe retornar areas (200 OK o 404 si no hay)', async () => {
        const res = await request(app).get('/areas');
        console.log(res.body.areas);
        expect([200, 404]).toContain(res.status);
        expect(res.headers["content-type"]).toContain("application/json");
    });
})

describe('Endpoints de /empleados', () => {
    let empleadoId;


    it('Debe retornar empleados (200 OK o 404 si no hay)', async () => {
        const res = await request(app).get('/empleados');
        console.log(res.body.empleados);
        expect([200, 404]).toContain(res.status);
        expect(res.headers["content-type"]).toContain("application/json");
    });


    it("Debe crear un empleado y recibir status 200", async () => {
        const nuevoEmpleado = {
            nombre: "Fulanito",
            dni: "12345678",
            nacimiento: "2003-03-03",
            desarrollador: "1",
            descripcion: "test",
            id_area: 1
        }

        const res = await request(app).post("/empleados").send(nuevoEmpleado);
        expect(res.status).toBe(200);
        expect(res.body.status).toBe("OK");
        expect(res.headers["content-type"]).toContain("application/json");
        empleadoId = res.body.id;
    });


    it("Debe obtener un empleado por ID con los datos correctos y recibir status 200", async () => {
        const res = await request(app).get(`/empleados/${empleadoId}`);
        expect(["Fulanito", "Menganito"]).toContain(res.body.empleado.nombre);
        expect(res.body.empleado.dni).toBe(12345678);
        expect(res.body.empleado.nacimiento).toBe("2003-03-03T03:00:00.000Z");
        expect(res.body.empleado.desarrollador).toBe(1);
        expect(res.body.empleado.descripcion).toBe("test");
        expect(res.body.empleado.id_area).toBe(1);
        expect(res.status).toBe(200);
        expect(res.body.status).toBe("OK");
        expect(res.headers["content-type"]).toContain("application/json");
    });

    it("Debe modificar un empleado y recibir status 200", async () => {
        const cambios = {
            nombre: "Menganito"
        };

        const res = await request(app).patch(`/empleados/${empleadoId}`).send(cambios);
        expect(res.status).toBe(200);
        expect(res.body.status).toBe("OK");
        expect(res.headers["content-type"]).toContain("application/json");
    });

    it("Debe fallar al modificar un empleado inexistente y recibir status 404", async () => {
        const cambios = {
            nombre: "Menganito"
        };
        const res = await request(app).patch(`/empleados/${-1}`).send(cambios);
        expect(res.status).toBe(404);
        expect(res.body.status).toBe("ERROR");
        expect(res.headers["content-type"]).toContain("application/json");
    });

    it("Debe fallar al obtener un empleado por ID inexistente y recibir status 404", async () => {
        const res = await request(app).get(`/empleados/${-1}`);
        expect(res.status).toBe(404);
        expect(res.body.status).toBe("ERROR");
        expect(res.headers["content-type"]).toContain("application/json");
    });

    it("Debe dar de baja un empleado y recibir status 200", async () => {
        const res = await request(app).delete(`/empleados/${empleadoId}`);
        expect(res.status).toBe(200);
        expect(res.body.status).toBe("OK");
        expect(res.headers["content-type"]).toContain("application/json");
    });

    it("Debe fallar al dar de baja un empleado inexistente y recibir status 404", async () => {
        const res = await request(app).delete(`/empleados/${-1}`);
        expect(res.status).toBe(404);
        expect(res.body.status).toBe("ERROR");
        expect(res.headers["content-type"]).toContain("application/json");
    });

    it("No debe encontrar un empleado eliminado (404)", async () => {
        const res = await request(app).get(`/empleados/${empleadoId}`);
        expect(res.status).toBe(404);
        expect(res.body.status).toBe("ERROR");
        expect(res.headers["content-type"]).toContain("application/json");
    });
});