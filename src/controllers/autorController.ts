import {IncomingMessage, ServerResponse} from "http";
import {AutorRepository} from "../repositories/autorRepository.js";
import {ValidationException} from "../exceptions/validationException.js";
import {NotFoundException} from "../exceptions/notFoundException.js";

export class AutorController {

    static async obtenerTodos(req: IncomingMessage, res: ServerResponse) {
        try {
            const autores = await AutorRepository.obtenerTodos();
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(autores));
        } catch (error) {
            console.error(error);
            res.writeHead(500, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                mensaje: 'Error al obtener autores'
            }));
        }
    }

    static async obtenerPorId(req: IncomingMessage, res: ServerResponse, id: number) {
        try {
            const autor = await AutorRepository.obtenerPorId(id);
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(autor));
        } catch (error) {
            console.error(error);
            if (error instanceof NotFoundException) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ mensaje: error.message }));
                return;
            }
            res.writeHead(500, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                mensaje: 'Error al obtener el autor'
            }));
        }
    }

    static async crear(req: IncomingMessage, res: ServerResponse, autor: any) {
        try {
            await AutorRepository.crear(autor);
            res.writeHead(201, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                mensaje: 'Autor creado correctamente'
            }));
        } catch (error) {
            console.error(error);
            if (error instanceof ValidationException) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ mensaje: error.message }));
                return;
            }
            if (error instanceof NotFoundException) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ mensaje: error.message }));
                return;
            }
            res.writeHead(500, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                mensaje: 'Error al crear el autor'
            }));
        }
    }

    static async actualizar(req: IncomingMessage, res: ServerResponse, id: number, autor: any) {
        try {
            await AutorRepository.actualizar(id, autor);
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                mensaje: 'Autor actualizado correctamente'
            }));
        } catch (error) {
            console.error(error);
            if (error instanceof ValidationException) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ mensaje: error.message }));
                return;
            }
            if (error instanceof NotFoundException) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ mensaje: error.message }));
                return;
            }
            res.writeHead(500, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                mensaje: 'Error al actualizar el autor'
            }));
        }
    }

    static async eliminar(req: IncomingMessage, res: ServerResponse, id: number) {
        try {
            await AutorRepository.eliminar(id);
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                mensaje: 'Autor eliminado correctamente'
            }));
        } catch (error) {
            console.error(error);
            if (error instanceof NotFoundException) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ mensaje: error.message }));
                return;
            }
            res.writeHead(500, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                mensaje: 'Error al eliminar el autor'
            }));
        }
    }
}