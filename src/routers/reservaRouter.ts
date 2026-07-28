import { IncomingMessage, ServerResponse } from "node:http";
import { leerBody } from "../utils/leerBody.js";
import { ReservaController } from "../controllers/reservaController.js";

export async function reservaRouter(
    req: IncomingMessage,
    res: ServerResponse,
    metodo: string,
    url: string
): Promise<boolean> {

    if (metodo === "GET" && url === "/reservas") {
        await ReservaController.obtenerTodos(req, res);
        return true;
    }

    if (metodo === "POST" && url === "/reservas") {
        const datos = await leerBody(req);
        await ReservaController.crear(req, res, datos);
        return true;
    }

    const match = url.match(/^\/reservas\/(\d+)$/);
    if (match) {
        const id = Number(match[1]);

        if (metodo === "GET") {
            await ReservaController.obtenerPorId(req, res, id);
            return true;
        }
        if (metodo === "DELETE") {
            await ReservaController.eliminar(req, res, id);
            return true;
        }
        if (metodo === "PUT") {
            const datos = await leerBody(req);
            await ReservaController.actualizar(req, res, id, datos);
            return true;
        }
    }

    return false;
}
