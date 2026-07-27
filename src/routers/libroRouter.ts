import {IncomingMessage, ServerResponse} from "node:http";
import {leerBody} from "../utils/leerBody.js";
import {LibroController} from "../controllers/libroController.js";

export async function libroRouter(
    req: IncomingMessage,
    res: ServerResponse,
    metodo: string,
    url: string
): Promise<boolean> {
    if (metodo === "GET" && url === "/libros") {
        await LibroController.obtenerTodos(req, res);
        return true;
    }
    if (metodo === "POST" && url === "/libros") {
        const datos = await leerBody(req);
        await LibroController.crear(req, res, datos);
        return true;
    }

    const match = url.match(/^\/libros\/(\d+)$/);
    if (match) {
        const id = Number(match[1]);
        if (metodo === "GET") {
            await LibroController.obtenerPorId(req, res, id);
            return true;
        }
        if (metodo === "DELETE") {
            await LibroController.eliminar(req, res, id);
            return true;
        }
        if (metodo === "PUT") {
            const datos = await leerBody(req);
            await LibroController.actualizar(req, res, id, datos);
            return true;
        }
    }
    return false;
}