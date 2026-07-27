import { IncomingMessage, ServerResponse } from 'http';
import { CategoriaRepository } from '../repositories/categoriaRepository.js';
import { ValidationException } from '../exceptions/validationException.js';
import { NotFoundException } from '../exceptions/notFoundException';

export class CategoriaController {

    static async obtenerTodos(req: IncomingMessage, res: ServerResponse) {
        try {
            const categorias = await CategoriaRepository.obtenerTodos();
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(categorias));
        } catch (error) {
            console.error(error);
            res.writeHead(500, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                mensaje: 'Error al obtener categorías'
            }));
        }
    }

    static async obtenerPorId(req: IncomingMessage, res: ServerResponse, id: number) {
        try {
            const categoria = await CategoriaRepository.obtenerPorId(id);
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(categoria));
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
                mensaje: 'Error al obtener la categoría'
            }));
        }
    }

    static async crear(req: IncomingMessage, res: ServerResponse, categoria: any) {
        try {
            await CategoriaRepository.crear(categoria);
            res.writeHead(201, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                mensaje: 'Categoría creada correctamente'
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
                mensaje: 'Error al crear la categoría'
            }));
        }
    }

    static async actualizar(req: IncomingMessage, res: ServerResponse, id: number, categoria: any) {
        try {
            await CategoriaRepository.actualizar(id, categoria);
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                mensaje: 'Categoría actualizada correctamente'
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
                mensaje: 'Error al actualizar la categoría'
            }));
        }
    }

    static async eliminar(req: IncomingMessage, res: ServerResponse, id: number) {
        try {
            await CategoriaRepository.eliminar(id);
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
