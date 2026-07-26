import { IncomingMessage, ServerResponse } from 'http';
import { RolRepository } from '../repositories/rolRepository.js';
import { ValidationException } from '../exceptions/validationException.js';
import { NotFoundException } from '../exceptions/notFoundException.js';
import { validarCamposRol, validarUsuarioExiste, validarRolExiste } from '../validators/rolValidator.js';

export class RolController {

    static async obtenerTodos(req: IncomingMessage, res: ServerResponse) {
        try {
            const roles = await RolRepository.obtenerTodos();

            res.writeHead(200, {
                'Content-Type': 'application/json'
            });

            res.end(JSON.stringify(roles));

        } catch (error) {

            console.error(error);
            res.writeHead(500, {
                'Content-Type': 'application/json'
            });

            res.end(JSON.stringify({
                mensaje: 'Error al obtener roles'
            }));
        }
    }

    static async obtenerPorId(req: IncomingMessage, res: ServerResponse, id: number) {
        try {
            await validarRolExiste(id);

            const rol = await RolRepository.obtenerPorId(id);

            res.writeHead(200, {
                'Content-Type': 'application/json'
            });

            res.end(JSON.stringify(rol));

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
                mensaje: 'Error al obtener el rol'
            }));
        }
    }

    static async crear(req: IncomingMessage, res: ServerResponse, datos: any) {
        try {
            validarCamposRol(datos);
            await validarUsuarioExiste(datos.fkIdUsuarioRol);

            await RolRepository.crear(datos);
            res.writeHead(201, {
                'Content-Type': 'application/json'
            });

            res.end(JSON.stringify({
                mensaje: 'Rol creado exitosamente'
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
                mensaje: 'Error al crear el rol'
            }));
        }
    }

    static async actualizar(req: IncomingMessage, res: ServerResponse, id: number, datos: any) {
        try {
            validarCamposRol(datos);
            await validarRolExiste(id);
            await validarUsuarioExiste(datos.fkIdUsuarioRol);

            await RolRepository.actualizar(id, datos);
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                mensaje: 'Rol actualizado exitosamente'
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
                mensaje: 'Error al actualizar el rol'
            }));
        }
    }

    static async eliminar(req: IncomingMessage, res: ServerResponse, id: number) {
        try {
            await validarRolExiste(id);

            await RolRepository.eliminar(id);
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                mensaje: 'Rol eliminado exitosamente'
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
                mensaje: 'Error al eliminar el rol'
            }));
        }
    }

}