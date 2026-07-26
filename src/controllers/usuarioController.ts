import { IncomingMessage, ServerResponse } from "node:http";
import { UsuarioRepository } from "../repositories/usuarioRepository.js";
import { ValidationException } from "../exceptions/validationException.js";
import { NotFoundException } from "../exceptions/notFoundException.js";
import { validarCamposUsuario, validarUsuarioExiste } from "../validators/usuarioValidator.js";

export class UsuarioController {

    static async obtenerTodos(req: IncomingMessage, res: ServerResponse) {
        try {
            const usuarios = await UsuarioRepository.obtenerTodos();

            res.writeHead(200, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify(usuarios));

        } catch (error) {

            console.error(error);

            res.writeHead(500, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                mensaje: "Error al obtener usuarios"
            }));
        }
    }


    static async obtenerPorId(req: IncomingMessage, res: ServerResponse, id: number) {
        try {
            await validarUsuarioExiste(id);

            const usuario = await UsuarioRepository.obtenerPorId(id);

            res.writeHead(200, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify(usuario));

        } catch (error) {

            console.error(error);

            if (error instanceof NotFoundException) {
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ mensaje: error.message }));
                return;
            }

            res.writeHead(500, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                mensaje: "Error al obtener el usuario"
            }));
        }
    }


    static async crear(req: IncomingMessage, res: ServerResponse, datos: any) {
        try {

            validarCamposUsuario(datos);

            await UsuarioRepository.crear(datos);

            res.writeHead(201, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                mensaje: "Usuario creado correctamente"
            }));

        } catch (error) {

            console.error(error);

            if (error instanceof ValidationException) {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ mensaje: error.message }));
                return;
            }

            res.writeHead(500, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                mensaje: "Error al crear usuario"
            }));
        }
    }


    static async actualizar(
        req: IncomingMessage,
        res: ServerResponse,
        id: number,
        datos: any
    ) {
        try {

            validarCamposUsuario(datos);
            await validarUsuarioExiste(id);

            await UsuarioRepository.actualizar(id, datos);

            res.writeHead(200, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                mensaje: "Usuario actualizado correctamente"
            }));


        } catch (error) {

            console.error(error);

            if (error instanceof ValidationException) {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ mensaje: error.message }));
                return;
            }

            if (error instanceof NotFoundException) {
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ mensaje: error.message }));
                return;
            }

            res.writeHead(500, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                mensaje: "Error al actualizar usuario"
            }));
        }
    }


    static async eliminar(
        req: IncomingMessage,
        res: ServerResponse,
        id: number
    ) {
        try {

            await validarUsuarioExiste(id);

            await UsuarioRepository.eliminar(id);

            res.writeHead(200, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                mensaje: "Usuario eliminado correctamente"
            }));

        } catch (error) {

            console.error(error);

            if (error instanceof NotFoundException) {
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ mensaje: error.message }));
                return;
            }

            res.writeHead(500, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                mensaje: "Error al eliminar usuario"
            }));
        }
    }
}