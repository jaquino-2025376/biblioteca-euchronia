import { IncomingMessage, ServerResponse } from "node:http";
import { usuarioRouter } from "./usuarioRouter.js";
import { rolRouter } from "./rolRouter.js";
// ... importa el resto

export async function router(req: IncomingMessage, res: ServerResponse) {
    const metodo = req.method ?? "";
    const url = req.url ?? "";

    if (await usuarioRouter(req, res, metodo, url)) return;
    if (await rolRouter(req, res, metodo, url)) return;
    // ... resto de routers

    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ mensaje: "Ruta no encontrada" }));
}
