import { ValidationException } from "../exceptions/validationException.js";
import { NotFoundException } from "../exceptions/notFoundException.js";
import { ReservaRepository } from "../repositories/reservaRepository.js";
import { validarUsuarioExiste } from "./usuarioValidator.js";
import { validarLibroExiste } from "./libroValidator.js";

const ESTADOS_VALIDOS = [
    "nueva",
    "confirmada",
    "operacional",
    "completada",
    "cancelada",
    "no llego el cliente por el libro"
];

export function validarCamposReserva(datos: any): void {
    if (!datos.fechaReserva) {
        throw new ValidationException("fechaReserva es obligatoria");
    }
    if (isNaN(Date.parse(datos.fechaReserva))) {
        throw new ValidationException("fechaReserva debe ser una fecha válida");
    }

    if (!datos.estado) {
        throw new ValidationException("estado es obligatorio");
    }
    if (!ESTADOS_VALIDOS.includes(datos.estado)) {
        throw new ValidationException(
            `estado debe ser uno de: ${ESTADOS_VALIDOS.join(", ")}`
        );
    }

    if (!datos.fkIdUsuarioReserva || !Number.isInteger(datos.fkIdUsuarioReserva)) {
        throw new ValidationException("fkIdUsuarioReserva es obligatorio y debe ser un número entero");
    }
    if (!datos.fkIdLibroReserva || !Number.isInteger(datos.fkIdLibroReserva)) {
        throw new ValidationException("fkIdLibroReserva es obligatorio y debe ser un número entero");
    }
}

export async function validarRelacionesReserva(datos: any): Promise<void> {
    await validarUsuarioExiste(datos.fkIdUsuarioReserva);
    await validarLibroExiste(datos.fkIdLibroReserva);
}

export async function validarReservaExiste(id: number): Promise<void> {
    const reserva = await ReservaRepository.obtenerPorId(id);
    if (!reserva || reserva.length === 0) {
        throw new NotFoundException("La reserva indicada no existe");
    }
}
