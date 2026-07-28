import { IncomingMessage, ServerResponse } from 'http';
import { EjemplarRepository } from '../repositories/ejemplarRepository.js';
import { ValidationException } from '../exceptions/validationException.js';
import { NotFoundException } from '../exceptions/notFoundException';

export class EjemplarController {

    static async obtenerTodos(req: IncomingMessage, res: ServerResponse) {
        try {
            const ejemplares = await EjemplarRepository.obtenerTodos();
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(ejemplares));
        } catch (error) {
            console.error(error);
            res.writeHead(500, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                mensaje: 'Error al obtener ejemplares'
            }));
        }
    }

    static async obtenerPorId(req: IncomingMessage, res: ServerResponse, id: number) {
        try {
            const ejemplar = await EjemplarRepository.obtenerPorId(id);
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(ejemplar));
        } catch (error) {
            if (error instanceof NotFoundException) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ mensaje: error.message }));
                return;
            }
            console.error(error);
            res.writeHead(500, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                mensaje: 'Error al obtener el ejemplar'
            }));
        }
    }

    static async crear(req: IncomingMessage, res: ServerResponse, ejemplar: any) {
        try {
            await EjemplarRepository.crear(ejemplar);
            res.writeHead(201, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                mensaje: 'Ejemplar creado correctamente'
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
                mensaje: 'Error al crear el ejemplar'
            }));
        }
    }

    static async actualizar(req: IncomingMessage, res: ServerResponse, id: number, ejemplar: any) {
        try {
            await EjemplarRepository.actualizar(id, ejemplar);
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                mensaje: 'Ejemplar actualizado correctamente'
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
                mensaje: 'Error al actualizar el ejemplar'
            }));
        }
    }

    static async eliminar(req: IncomingMessage, res: ServerResponse, id: number) {
         try {
            await EjemplarRepository.eliminar(id);
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                res.end(JSON.stringify({
                    mensaje: 'Categoría eliminada correctamente'
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
                    mensaje: 'Error al eliminar la categoría'
                }));
            }
        
    }
    
}