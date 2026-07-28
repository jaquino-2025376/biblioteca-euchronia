import { IncomingMessage, ServerResponse } from 'http';
import { ReseniaRepository } from '../repositories/reseniaRepository.js';
import { ValidationException } from '../exceptions/validationException.js';
import { NotFoundException } from '../exceptions/notFoundException.js';
import {
    validarCamposResenia,
    validarRelacionesResenia,
    validarReseniaExiste
} from '../validators/reseniaValidator.js';

export class ReseniaController {

    static async obtenerTodos(req: IncomingMessage, res: ServerResponse) {
        try {
            const resenias = await ReseniaRepository.obtenerTodos();

            res.writeHead(200, {
                'Content-Type': 'application/json'
            });

            res.end(JSON.stringify(resenias));

        } catch (error) {
            console.error(error);
            res.writeHead(500, {
                'Content-Type': 'application/json'
            });

            res.end(JSON.stringify({
                mensaje: 'Error al obtener reseñas'
            }));
        }
    }

    static async obtenerPorId(req: IncomingMessage, res: ServerResponse, id: number) {
        try {
            await validarReseniaExiste(id);

            const resenia = await ReseniaRepository.obtenerPorId(id);

            res.writeHead(200, {
                'Content-Type': 'application/json'
            });

            res.end(JSON.stringify(resenia));

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
                mensaje: 'Error al obtener la reseña'
            }));
        }
    }

    static async crear(req: IncomingMessage, res: ServerResponse, datos: any) {
        try {
            validarCamposResenia(datos);
            await validarRelacionesResenia(datos);

            await ReseniaRepository.crear(datos);
            res.writeHead(201, {
                'Content-Type': 'application/json'
            });

            res.end(JSON.stringify({
                mensaje: 'Reseña creada exitosamente'
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
                mensaje: 'Error al crear la reseña'
            }));
        }
    }

    static async actualizar(req: IncomingMessage, res: ServerResponse, id: number, datos: any) {
        try {
            validarCamposResenia(datos);
            await validarReseniaExiste(id);
            await validarRelacionesResenia(datos);

            await ReseniaRepository.actualizar(id, datos);
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                mensaje: 'Reseña actualizada exitosamente'
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
                mensaje: 'Error al actualizar la reseña'
            }));
        }
    }

    static async eliminar(req: IncomingMessage, res: ServerResponse, id: number) {
        try {
            await validarReseniaExiste(id);

            await ReseniaRepository.eliminar(id);
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                mensaje: 'Reseña eliminada exitosamente'
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
                mensaje: 'Error al eliminar la reseña'
            }));
        }
    }

}
