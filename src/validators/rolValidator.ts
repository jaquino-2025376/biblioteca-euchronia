import { ValidationException } from "../exceptions/validationException.js";
import { NotFoundException } from "../exceptions/notFoundException.js";
import { UsuarioRepository } from "../repositories/usuarioRepository.js";
import { RolRepository } from "../repositories/rolRepository.js";

export function validarCamposRol(datos: any): void {
    if (!datos.nombreRol || !datos.fkIdUsuarioRol) {
        throw new ValidationException("nombreRol y fkIdUsuarioRol son obligatorios");
    }

    if (typeof datos.nombreRol !== "string" || datos.nombreRol.trim().length === 0) {
        throw new ValidationException("nombreRol debe ser un texto no vacío");
    }

    if (datos.nombreRol.length > 50) {
        throw new ValidationException("nombreRol no puede tener más de 50 caracteres");
    }

    if (typeof datos.fkIdUsuarioRol !== "number" || !Number.isInteger(datos.fkIdUsuarioRol)) {
        throw new ValidationException("fkIdUsuarioRol debe ser un número entero");
    }
}

export async function validarUsuarioExiste(fkIdUsuarioRol: number): Promise<void> {
    const usuario = await UsuarioRepository.obtenerPorId(fkIdUsuarioRol);

    if (!usuario || usuario.length === 0) {
        throw new NotFoundException("El usuario indicado no existe");
    }
}

export async function validarRolExiste(idRol: number): Promise<void> {
    const rol = await RolRepository.obtenerPorId(idRol);

    if (!rol || rol.length === 0) {
        throw new NotFoundException("El rol indicado no existe");
    }
}