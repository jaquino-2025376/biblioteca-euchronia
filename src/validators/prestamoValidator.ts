import { ValidationException } from "../exceptions/validationException.js";
import { NotFoundException } from "../exceptions/notFoundException.js";
import { PrestamoRepository } from "../repositories/prestamoRepository.js";
import { validarUsuarioExiste } from "./usuarioValidator.js";
import { validarLibroExiste } from "./libroValidator.js";

const ESTADOS_VALIDOS = ["activo", "devuelto", "retrasado"];

export function validarCamposPrestamo(datos: any): void {
    if (!datos.fechaPrestamo) {
        throw new ValidationException("fechaPrestamo es obligatoria");
    }
    if (isNaN(Date.parse(datos.fechaPrestamo))) {
        throw new ValidationException("fechaPrestamo debe ser una fecha válida");
    }

    if (!datos.fechaDevolucion) {
        throw new ValidationException("fechaDevolucion es obligatoria");
    }
    if (isNaN(Date.parse(datos.fechaDevolucion))) {
        throw new ValidationException("fechaDevolucion debe ser una fecha válida");
    }

    if (new Date(datos.fechaDevolucion) < new Date(datos.fechaPrestamo)) {
        throw new ValidationException("fechaDevolucion no puede ser anterior a fechaPrestamo");
    }

    if (!datos.estado) {
        throw new ValidationException("estado es obligatorio");
    }
    if (!ESTADOS_VALIDOS.includes(datos.estado)) {
        throw new ValidationException(
            `estado debe ser uno de: ${ESTADOS_VALIDOS.join(", ")}`
        );
    }

    if (datos.cantidad === undefined || datos.cantidad === null) {
        throw new ValidationException("cantidad es obligatoria");
    }
    if (!Number.isInteger(datos.cantidad) || datos.cantidad <= 0) {
        throw new ValidationException("cantidad debe ser un número entero mayor a 0");
    }

    if (!datos.fkIdUsuarioPrestamo || !Number.isInteger(datos.fkIdUsuarioPrestamo)) {
        throw new ValidationException("fkIdUsuarioPrestamo es obligatorio y debe ser un número entero");
    }
    if (!datos.fkIdLibroPrestamo || !Number.isInteger(datos.fkIdLibroPrestamo)) {
        throw new ValidationException("fkIdLibroPrestamo es obligatorio y debe ser un número entero");
    }
}

export async function validarRelacionesPrestamo(datos: any): Promise<void> {
    await validarUsuarioExiste(datos.fkIdUsuarioPrestamo);
    await validarLibroExiste(datos.fkIdLibroPrestamo);
}

export async function validarPrestamoExiste(id: number): Promise<void> {
    const prestamo = await PrestamoRepository.obtenerPorId(id);
    if (!prestamo || prestamo.length === 0) {
        throw new NotFoundException("El préstamo indicado no existe");
    }
}
