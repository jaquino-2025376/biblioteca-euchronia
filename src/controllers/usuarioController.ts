import { IncomingMessage, ServerResponse } from "node:http";
import { UsuarioRepository } from "../repositories/usuarioRepository.js";

export class UsuarioController {

    static async obtenerTodos(req: IncomingMessage, res: ServerResponse) {

        try {

            const usuarios = await UsuarioRepository.obtenerTodos();

            res.writeHead(200, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify(usuarios));

        } catch {

            res.writeHead(500);

            res.end(JSON.stringify({
                mensaje: "Error al obtener usuarios"
            }));

        }

    }

}