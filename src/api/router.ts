import { IncomingMessage, ServerResponse } from "node:http";
import { UsuarioController } from "../controllers/usuarioController.js";
import { leerBody } from "../utils/leerBody.js";


export async function router(
    req: IncomingMessage,
    res: ServerResponse
) {

    const metodo = req.method;
    const url = req.url;


    if (metodo === "GET" && url === "/usuarios") {
        return UsuarioController.obtenerTodos(req, res);
    }


    if (metodo === "POST" && url === "/usuarios") {

        const datos = await leerBody(req);

        return UsuarioController.crear(req, res, datos);
    }


    const usuarioMatch = url?.match(/^\/usuarios\/(\d+)$/);


    if (usuarioMatch) {

        const id = Number(usuarioMatch[1]);


        if (metodo === "GET") {
            return UsuarioController.obtenerPorId(req, res, id);
        }


        if (metodo === "DELETE") {
            return UsuarioController.eliminar(req, res, id);
        }


        if (metodo === "PUT") {

            const datos = await leerBody(req);

            return UsuarioController.actualizar(req, res, id, datos);
        }
    }


    res.writeHead(404, {
        "Content-Type": "application/json"
    });

    res.end(JSON.stringify({
        mensaje: "Ruta no encontrada"
    }));
}