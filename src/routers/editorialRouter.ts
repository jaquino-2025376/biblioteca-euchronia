import {IncomingMessage, ServerResponse} from "http";
import {leerBody} from "../utils/leerBody.js";
import {EditorialController} from "../controllers/editorialController.js";

export async function editorialRouter(
    req: IncomingMessage,
    res: ServerResponse,
    metodo: string,
    url: string
): Promise<boolean> {
    if (metodo === "GET" && url === "/editoriales") {
        await EditorialController.obtenerTodos(req, res);
        return true;
    }

    if (metodo === "POST" && url === "/editoriales") {
        const datos = await leerBody(req);
        await EditorialController.crear(req, res, datos);
        return true;
    }

    const match = url.match(/^\/editoriales\/(\d+)$/);
    if (match) {
        const id = Number(match[1]);
        if (metodo === "GET") {
            await EditorialController.obtenerPorId(req, res, id);
            return true;
        }
        if (metodo === "DELETE") {
            await EditorialController.eliminar(req, res, id);
            return true;
        }
        if (metodo === "PUT") {
            const datos = await leerBody(req);
            await EditorialController.actualizar(req, res, id, datos);
            return true;
        }
    }

    return false;
}
