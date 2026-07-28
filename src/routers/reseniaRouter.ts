import { IncomingMessage, ServerResponse } from "node:http";
import { leerBody } from "../utils/leerBody.js";
import { ReseniaController } from "../controllers/reseniaController.js";

export async function reseniaRouter(
    req: IncomingMessage,
    res: ServerResponse,
    metodo: string,
    url: string
): Promise<boolean> {

    if (metodo === "GET" && url === "/resenias") {
        await ReseniaController.obtenerTodos(req, res);
        return true;
    }

    if (metodo === "POST" && url === "/resenias") {
        const datos = await leerBody(req);
        await ReseniaController.crear(req, res, datos);
        return true;
    }

    const match = url.match(/^\/resenias\/(\d+)$/);
    if (match) {
        const id = Number(match[1]);

        if (metodo === "GET") {
            await ReseniaController.obtenerPorId(req, res, id);
            return true;
        }
        if (metodo === "DELETE") {
            await ReseniaController.eliminar(req, res, id);
            return true;
        }
        if (metodo === "PUT") {
            const datos = await leerBody(req);
            await ReseniaController.actualizar(req, res, id, datos);
            return true;
        }
    }

    return false;
}
