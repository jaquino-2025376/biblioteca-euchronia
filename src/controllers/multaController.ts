import { IncomingMessage, ServerResponse } from 'http';
import { MultaRepository } from '../repositories/multaRepository.js';
import { ValidationException } from '../exceptions/validationException.js';
import { NotFoundException } from '../exceptions/notFoundException.js';
import {
    validarCamposMulta,
    validarRelacionesMulta,
    validarMultaExiste
} from '../validators/multaValidator.js';

export class MultaController {

    static async obtenerTodos(req: IncomingMessage, res: ServerResponse) {
        try {
            const multas = await MultaRepository.obtenerTodos();

            res.writeHead(200, {
                'Content-Type': 'application/json'
            });

            res.end(JSON.stringify(multas));

        } catch (error) {
            console.error(error);
            res.writeHead(500, {
                'Content-Type': 'application/json'
            });

            res.end(JSON.stringify({
                mensaje: 'Error al obtener multas'
            }));
        }
    }

    static async obtenerPorId(req: IncomingMessage, res: ServerResponse, id: number) {
        try {
            await validarMultaExiste(id);

            const multa = await MultaRepository.obtenerPorId(id);

            res.writeHead(200, {
                'Content-Type': 'application/json'
            });

            res.end(JSON.stringify(multa));

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
                mensaje: 'Error al obtener la multa'
            }));
        }
    }

    static async crear(req: IncomingMessage, res: ServerResponse, datos: any) {
        try {
            validarCamposMulta(datos);
            await validarRelacionesMulta(datos);

            await MultaRepository.crear(datos);
            res.writeHead(201, {
                'Content-Type': 'application/json'
            });

            res.end(JSON.stringify({
                mensaje: 'Multa creada exitosamente'
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
                mensaje: 'Error al crear la multa'
            }));
        }
    }

    static async actualizar(req: IncomingMessage, res: ServerResponse, id: number, datos: any) {
        try {
            validarCamposMulta(datos);
            await validarMultaExiste(id);
            await validarRelacionesMulta(datos);

            await MultaRepository.actualizar(id, datos);
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                mensaje: 'Multa actualizada exitosamente'
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
                mensaje: 'Error al actualizar la multa'
            }));
        }
    }

    static async eliminar(req: IncomingMessage, res: ServerResponse, id: number) {
        try {
            await validarMultaExiste(id);

            await MultaRepository.eliminar(id);
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                mensaje: 'Multa eliminada exitosamente'
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
                mensaje: 'Error al eliminar la multa'
            }));
        }
    }

}
