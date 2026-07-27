import {IncomingMessage, ServerResponse} from "http";
import {EditorialRepository} from "../repositories/editorialRepository.js";
import {ValidationException} from "../exceptions/validationException.js";
import {NotFoundException} from "../exceptions/notFoundException.js";

export class EditorialController {

    static async obtenerTodos(req: IncomingMessage, res: ServerResponse) {
        try {
            const editoriales = await EditorialRepository.obtenerTodos();
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(editoriales));
        } catch (error) {
            console.error(error);
            res.writeHead(500, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                mensaje: 'Error al obtener editoriales'
            }));
        }
    }

    static async obtenerPorId(req: IncomingMessage, res: ServerResponse, id: number) {
        try {
            const editorial = await EditorialRepository.obtenerPorId(id);
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(editorial));
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
                mensaje: 'Error al obtener la editorial'
            }));
        }
    }

    static async crear(req: IncomingMessage, res: ServerResponse, editorial: any) {
        try {
            await EditorialRepository.crear(editorial);
            res.writeHead(201, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                mensaje: 'Editorial creada correctamente'
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
                mensaje: 'Error al crear la editorial'
            }));
        }
    }

    static async actualizar(req: IncomingMessage, res: ServerResponse, id: number, editorial: any) {
        try {
            await EditorialRepository.actualizar(id, editorial);
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                mensaje: 'Editorial actualizada correctamente'
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
                mensaje: 'Error al actualizar la editorial'
            }));
        }
    }

    static async eliminar(req: IncomingMessage, res: ServerResponse, id: number) {
        try {
            await EditorialRepository.eliminar(id);
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                mensaje: 'Editorial eliminada correctamente'
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
                mensaje: 'Error al eliminar la editorial'
            }));
        }
    }
}