import { IncomingMessage, ServerResponse } from "node:http";
import { leerBody } from "../utils/leerBody.js";
import { PrestamoController } from "../controllers/prestamoController.js";

export async function prestamoRouter(
    req: IncomingMessage,
    res: ServerResponse,
    metodo: string,
    url: string
): Promise<boolean> {

    if (metodo === "GET" && url === "/prestamos") {
        await PrestamoController.obtenerTodos(req, res);
        return true;
    }

    if (metodo === "POST" && url === "/prestamos") {
        const datos = await leerBody(req);
        await PrestamoController.crear(req, res, datos);
        return true;
    }

    const match = url.match(/^\/prestamos\/(\d+)$/);
    if (match) {
        const id = Number(match[1]);

        if (metodo === "GET") {
            await PrestamoController.obtenerPorId(req, res, id);
            return true;
        }
        if (metodo === "DELETE") {
            await PrestamoController.eliminar(req, res, id);
            return true;
        }
        if (metodo === "PUT") {
            const datos = await leerBody(req);
            await PrestamoController.actualizar(req, res, id, datos);
            return true;
        }
    }

    return false;
}
