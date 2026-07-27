import { IncomingMessage, ServerResponse } from "node:http";
import { UsuarioController } from "../controllers/usuarioController.js";
import { leerBody } from "../utils/leerBody.js";

export async function usuarioRouter(
    req: IncomingMessage,
    res: ServerResponse,
    metodo: string,
    url: string
): Promise<boolean> {

    if (metodo === "GET" && url === "/usuarios") {
        await UsuarioController.obtenerTodos(req, res);
        return true;
    }

    if (metodo === "POST" && url === "/usuarios") {
        const datos = await leerBody(req);
        await UsuarioController.crear(req, res, datos);
        return true;
    }

    const match = url.match(/^\/usuarios\/(\d+)$/);
    if (match) {
        const id = Number(match[1]);

        if (metodo === "GET") {
            await UsuarioController.obtenerPorId(req, res, id);
            return true;
        }
        if (metodo === "DELETE") {
            await UsuarioController.eliminar(req, res, id);
            return true;
        }
        if (metodo === "PUT") {
            const datos = await leerBody(req);
            await UsuarioController.actualizar(req, res, id, datos);
            return true;
        }
    }

    return false; 
}