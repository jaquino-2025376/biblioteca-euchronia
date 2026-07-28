import { IncomingMessage, ServerResponse } from "node:http";
import { usuarioRouter } from "./usuarioRouter.js";
import { rolRouter } from "./rolRouter.js";
import { categoriaRouter } from "./categoriaRouter.js";
import { editorialRouter } from "./editorialRouter.js";
import { autorRouter } from "./autorRouter.js";
import { libroRouter } from "./libroRouter.js";
import { ejemplarRouter } from "./ejemplarRouter.js";
import { prestamoRouter } from "./prestamoRouter.js";
import { multaRouter } from "./multaRouter.js";
import { reservaRouter } from "./reservaRouter.js";
import { reseniaRouter } from "./reseniaRouter.js";

export async function router(req: IncomingMessage, res: ServerResponse) {
    const metodo = req.method ?? "";
    const url = req.url ?? "";

    if (await usuarioRouter(req, res, metodo, url)) return;
    if (await rolRouter(req, res, metodo, url)) return;
    if (await categoriaRouter(req, res, metodo, url)) return;
    if (await editorialRouter(req, res, metodo, url)) return;
    if (await autorRouter(req, res, metodo, url)) return;
    if (await libroRouter(req, res, metodo, url)) return;
    if (await ejemplarRouter(req, res, metodo, url)) return;
    if (await prestamoRouter(req, res, metodo, url)) return;
    if (await multaRouter(req, res, metodo, url)) return;
    if (await reservaRouter(req, res, metodo, url)) return;
    if (await reseniaRouter(req, res, metodo, url)) return;

    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ mensaje: "Ruta no encontrada" }));
}