import {IncomingMessage, ServerResponse} from "node:http";
import {leerBody} from "../utils/leerBody.js";
import {CategoriaController} from "../controllers/categoriaController.js";

export async function categoriaRouter(
    req: IncomingMessage,
    res: ServerResponse,
    metodo: string,
    url: string
): Promise<boolean> {
    if (metodo === "GET" && url === "/categorias") {
        await CategoriaController.obtenerTodos(req, res);
        return true;
    }

    if (metodo === "POST" && url === "/categorias") {
        const datos = await leerBody(req);
        await CategoriaController.crear(req, res, datos);
        return true;
    }

    const match = url.match(/^\/categorias\/(\d+)$/);
    if (match) {
        const id = Number(match[1]);
        if (metodo === "GET") {
            await CategoriaController.obtenerPorId(req, res, id);
            return true;
        }
        if (metodo === "DELETE") {
            await CategoriaController.eliminar(req, res, id);
            return true;
        }
        if (metodo === "PUT") {
            const datos = await leerBody(req);
            await CategoriaController.actualizar(req, res, id, datos);
            return true;
        }
    }

    return false; 
}