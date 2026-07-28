import {IncomingMessage, ServerResponse} from "node:http";
import {leerBody} from "../utils/leerBody.js";
import {EjemplarController} from "../controllers/ejemplarController.js";

export async function ejemplarRouter(
    req: IncomingMessage,
    res: ServerResponse,
    metodo: string,
    url: string
): Promise<boolean>{
    if (metodo === "GET" && url === "/ejemplares") {
            await EjemplarController.obtenerTodos(req, res);
            return true;
        }
    
        if (metodo === "POST" && url === "/ejemplares") {
            const datos = await leerBody(req);
            await EjemplarController.crear(req, res, datos);
            return true;
        }
    
        const match = url.match(/^\/ejemplares\/(\d+)$/);
        if (match) {
            const id = Number(match[1]);
            if (metodo === "GET") {
                await EjemplarController.obtenerPorId(req, res, id);
                return true;
            }
            if (metodo === "DELETE") {
                await EjemplarController.eliminar(req, res, id);
                return true;
            }
            if (metodo === "PUT") {
                const datos = await leerBody(req);
                await EjemplarController.actualizar(req, res, id, datos);
                return true;
            }
        }
    
        return false;
}