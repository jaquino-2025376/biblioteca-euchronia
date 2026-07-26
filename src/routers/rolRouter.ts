import { IncomingMessage, ServerResponse } from "node:http";
import { leerBody } from "../utils/leerBody.js";
import { RolController } from "../controllers/rolController.js";

export async function rolRouter(
    req: IncomingMessage,
    res: ServerResponse,
    metodo: string,
    url: string
): Promise<boolean> {

    if (metodo === "GET" && url === "/roles") {
        await RolController.obtenerTodos(req, res);
        return true;
    }

    if (metodo === "POST" && url === "/roles") {
        const datos = await leerBody(req);
        await RolController.crear(req, res, datos);
        return true;
    }

    const match = url.match(/^\/roles\/(\d+)$/);
    if (match) {
        const id = Number(match[1]);

        if (metodo === "GET") {
            await RolController.obtenerPorId(req, res, id);
            return true;
        }
        if (metodo === "DELETE") {
            await RolController.eliminar(req, res, id);
            return true;
        }
        if (metodo === "PUT") {
            const datos = await leerBody(req);
            await RolController.actualizar(req, res, id, datos);
            return true;
        }
    }

    return false; // no coincidió ninguna ruta de este módulo
}