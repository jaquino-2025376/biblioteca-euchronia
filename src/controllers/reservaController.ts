import { IncomingMessage, ServerResponse } from 'http';
import { ReservaRepository } from '../repositories/reservaRepository.js';
import { ValidationException } from '../exceptions/validationException.js';
import { NotFoundException } from '../exceptions/notFoundException.js';
import {
    validarCamposReserva,
    validarRelacionesReserva,
    validarReservaExiste
} from '../validators/reservaValidator.js';

export class ReservaController {

    static async obtenerTodos(req: IncomingMessage, res: ServerResponse) {
        try {
            const reservas = await ReservaRepository.obtenerTodos();

            res.writeHead(200, {
                'Content-Type': 'application/json'
            });

            res.end(JSON.stringify(reservas));

        } catch (error) {
            console.error(error);
            res.writeHead(500, {
                'Content-Type': 'application/json'
            });

            res.end(JSON.stringify({
                mensaje: 'Error al obtener reservas'
            }));
        }
    }

    static async obtenerPorId(req: IncomingMessage, res: ServerResponse, id: number) {
        try {
            await validarReservaExiste(id);

            const reserva = await ReservaRepository.obtenerPorId(id);

            res.writeHead(200, {
                'Content-Type': 'application/json'
            });

            res.end(JSON.stringify(reserva));

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
                mensaje: 'Error al obtener la reserva'
            }));
        }
    }

    static async crear(req: IncomingMessage, res: ServerResponse, datos: any) {
        try {
            validarCamposReserva(datos);
            await validarRelacionesReserva(datos);

            await ReservaRepository.crear(datos);
            res.writeHead(201, {
                'Content-Type': 'application/json'
            });

            res.end(JSON.stringify({
                mensaje: 'Reserva creada exitosamente'
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
                mensaje: 'Error al crear la reserva'
            }));
        }
    }

    static async actualizar(req: IncomingMessage, res: ServerResponse, id: number, datos: any) {
        try {
            validarCamposReserva(datos);
            await validarReservaExiste(id);
            await validarRelacionesReserva(datos);

            await ReservaRepository.actualizar(id, datos);
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                mensaje: 'Reserva actualizada exitosamente'
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
                mensaje: 'Error al actualizar la reserva'
            }));
        }
    }

    static async eliminar(req: IncomingMessage, res: ServerResponse, id: number) {
        try {
            await validarReservaExiste(id);

            await ReservaRepository.eliminar(id);
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                mensaje: 'Reserva eliminada exitosamente'
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
                mensaje: 'Error al eliminar la reserva'
            }));
        }
    }

}
