import { ValidationException } from "../exceptions/validationException.js";
import { NotFoundException } from "../exceptions/notFoundException.js";
import { UsuarioRepository } from "../repositories/usuarioRepository.js";

export function validarCamposUsuario(datos: any): void {
    if (!datos.nombre || !datos.apellido || !datos.correo || !datos.telefono || !datos.fechaRegistro) {
        throw new ValidationException(
            "nombre, apellido, correo, telefono y fechaRegistro son obligatorios"
        );
    }

    if (typeof datos.correo !== "string" || !datos.correo.includes("@")) {
        throw new ValidationException("correo no tiene un formato válido");
    }

    if (typeof datos.telefono !== "string" || !/^\d+$/.test(datos.telefono)) {
        throw new ValidationException("telefono debe contener solo dígitos");
    }

    if (isNaN(Date.parse(datos.fechaRegistro))) {
        throw new ValidationException("fechaRegistro no tiene un formato de fecha válido");
    }
}

export async function validarUsuarioExiste(id: number): Promise<void> {
    const usuario = await UsuarioRepository.obtenerPorId(id);

    if (!usuario || usuario.length === 0) {
        throw new NotFoundException("El usuario indicado no existe");
    }
}