import { IncomingMessage, ServerResponse } from "node:http";
import { leerBody } from "../utils/leerBody.js";
import { MultaController } from "../controllers/multaController.js";

export async function multaRouter(
    req: IncomingMessage,
    res: ServerResponse,
    metodo: string,
    url: string
): Promise<boolean> {

    if (metodo === "GET" && url === "/multas") {
        await MultaController.obtenerTodos(req, res);
        return true;
    }

    if (metodo === "POST" && url === "/multas") {
        const datos = await leerBody(req);
        await MultaController.crear(req, res, datos);
        return true;
    }

    const match = url.match(/^\/multas\/(\d+)$/);
    if (match) {
        const id = Number(match[1]);

        if (metodo === "GET") {
            await MultaController.obtenerPorId(req, res, id);
            return true;
        }
        if (metodo === "DELETE") {
            await MultaController.eliminar(req, res, id);
            return true;
        }
        if (metodo === "PUT") {
            const datos = await leerBody(req);
            await MultaController.actualizar(req, res, id, datos);
            return true;
        }
    }

    return false;
}
