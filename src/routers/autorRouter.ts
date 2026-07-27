import {IncomingMessage, ServerResponse} from "http";
import {leerBody} from "../utils/leerBody.js";
import {AutorController} from "../controllers/autorController.js";

export async function autorRouter(
    req: IncomingMessage,
    res: ServerResponse,
    metodo: string,
    url: string
): Promise<boolean> {
    if (metodo === "GET" && url === "/autores") {
        await AutorController.obtenerTodos(req, res);
        return true;
    }
    if (metodo === "POST" && url === "/autores") {
        const datos = await leerBody(req);
        await AutorController.crear(req, res, datos);
        return true;
    }
    
    const match = url.match(/^\/autores\/(\d+)$/);
    if (match) {
        const id = Number(match[1]);
        if (metodo === "GET") {
            await AutorController.obtenerPorId(req, res, id);
            return true;
        }
        if (metodo === "DELETE") {
            await AutorController.eliminar(req, res, id);
            return true;
        }
        if (metodo === "PUT") {
            const datos = await leerBody(req);
            await AutorController.actualizar(req, res, id, datos);
            return true;
        }
    }
    return false; 
}