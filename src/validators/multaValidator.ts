import { ValidationException } from "../exceptions/validationException.js";
import { NotFoundException } from "../exceptions/notFoundException.js";
import { MultaRepository } from "../repositories/multaRepository.js";
import { validarPrestamoExiste } from "./prestamoValidator.js";

const ESTADOS_VALIDOS = ["pendiente", "pagada", "cancelada"];

export function validarCamposMulta(datos: any): void {
    if (datos.monto === undefined || datos.monto === null) {
        throw new ValidationException("monto es obligatorio");
    }
    if (typeof datos.monto !== "number" || datos.monto < 0) {
        throw new ValidationException("monto debe ser un número mayor o igual a 0");
    }

    if (!datos.motivo) {
        throw new ValidationException("motivo es obligatorio");
    }
    if (typeof datos.motivo !== "string" || datos.motivo.trim().length === 0) {
        throw new ValidationException("motivo debe ser un texto no vacío");
    }
    if (datos.motivo.length > 100) {
        throw new ValidationException("motivo no puede tener más de 100 caracteres");
    }

    if (!datos.fechaGeneracion) {
        throw new ValidationException("fechaGeneracion es obligatoria");
    }
    if (isNaN(Date.parse(datos.fechaGeneracion))) {
        throw new ValidationException("fechaGeneracion debe ser una fecha válida");
    }

    if (!datos.estado) {
        throw new ValidationException("estado es obligatorio");
    }
    if (!ESTADOS_VALIDOS.includes(datos.estado)) {
        throw new ValidationException(
            `estado debe ser uno de: ${ESTADOS_VALIDOS.join(", ")}`
        );
    }

    if (!datos.fkIdPrestamoMulta || !Number.isInteger(datos.fkIdPrestamoMulta)) {
        throw new ValidationException("fkIdPrestamoMulta es obligatorio y debe ser un número entero");
    }
}

export async function validarRelacionesMulta(datos: any): Promise<void> {
    await validarPrestamoExiste(datos.fkIdPrestamoMulta);
}

export async function validarMultaExiste(id: number): Promise<void> {
    const multa = await MultaRepository.obtenerPorId(id);
    if (!multa || multa.length === 0) {
        throw new NotFoundException("La multa indicada no existe");
    }
}
