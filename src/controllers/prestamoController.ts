import { IncomingMessage, ServerResponse } from 'http';
import { PrestamoRepository } from '../repositories/prestamoRepository.js';
import { ValidationException } from '../exceptions/validationException.js';
import { NotFoundException } from '../exceptions/notFoundException.js';
import {
    validarCamposPrestamo,
    validarRelacionesPrestamo,
    validarPrestamoExiste
} from '../validators/prestamoValidator.js';

export class PrestamoController {

    static async obtenerTodos(req: IncomingMessage, res: ServerResponse) {
        try {
            const prestamos = await PrestamoRepository.obtenerTodos();

            res.writeHead(200, {
                'Content-Type': 'application/json'
            });

            res.end(JSON.stringify(prestamos));

        } catch (error) {
            console.error(error);
            res.writeHead(500, {
                'Content-Type': 'application/json'
            });

            res.end(JSON.stringify({
                mensaje: 'Error al obtener préstamos'
            }));
        }
    }

    static async obtenerPorId(req: IncomingMessage, res: ServerResponse, id: number) {
        try {
            await validarPrestamoExiste(id);

            const prestamo = await PrestamoRepository.obtenerPorId(id);

            res.writeHead(200, {
                'Content-Type': 'application/json'
            });

            res.end(JSON.stringify(prestamo));

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
                mensaje: 'Error al obtener el préstamo'
            }));
        }
    }

    static async crear(req: IncomingMessage, res: ServerResponse, datos: any) {
        try {
            validarCamposPrestamo(datos);
            await validarRelacionesPrestamo(datos);

            await PrestamoRepository.crear(datos);
            res.writeHead(201, {
                'Content-Type': 'application/json'
            });

            res.end(JSON.stringify({
                mensaje: 'Préstamo creado exitosamente'
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
                mensaje: 'Error al crear el préstamo'
            }));
        }
    }

    static async actualizar(req: IncomingMessage, res: ServerResponse, id: number, datos: any) {
        try {
            validarCamposPrestamo(datos);
            await validarPrestamoExiste(id);
            await validarRelacionesPrestamo(datos);

            await PrestamoRepository.actualizar(id, datos);
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                mensaje: 'Préstamo actualizado exitosamente'
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
                mensaje: 'Error al actualizar el préstamo'
            }));
        }
    }

    static async eliminar(req: IncomingMessage, res: ServerResponse, id: number) {
        try {
            await validarPrestamoExiste(id);

            await PrestamoRepository.eliminar(id);
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                mensaje: 'Préstamo eliminado exitosamente'
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
                mensaje: 'Error al eliminar el préstamo'
            }));
        }
    }

}
