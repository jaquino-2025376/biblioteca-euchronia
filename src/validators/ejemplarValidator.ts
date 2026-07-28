import { ValidationException } from "../exceptions/validationException.js";
import { NotFoundException } from "../exceptions/notFoundException.js";
import { EjemplarRepository } from "../repositories/ejemplarRepository.js";
import { validarLibroExiste } from "./libroValidator.js";

const ESTADOS_VALIDOS = ["disponible", "prestado", "reservado", "danado"];

export function validarCamposEjemplar(datos: any): void {
    if (!datos.estado) {
        throw new ValidationException("estado es obligatorio");
    }
    if (!ESTADOS_VALIDOS.includes(datos.estado)) {
        throw new ValidationException(
            `estado debe ser uno de: ${ESTADOS_VALIDOS.join(", ")}`
        );
    }

    if (!datos.fechaAdquisicion) {
        throw new ValidationException("fechaAdquisicion es obligatoria");
    }
    if (isNaN(Date.parse(datos.fechaAdquisicion))) {
        throw new ValidationException("fechaAdquisicion debe ser una fecha válida");
    }
    if (new Date(datos.fechaAdquisicion) > new Date()) {
        throw new ValidationException("fechaAdquisicion no puede ser una fecha futura");
    }

    if (!datos.fkIdLibroEjemplar || !Number.isInteger(datos.fkIdLibroEjemplar)) {
        throw new ValidationException("fkIdLibroEjemplar es obligatorio y debe ser un número entero");
    }
}

export async function validarRelacionesEjemplar(datos: any): Promise<void> {
    await validarLibroExiste(datos.fkIdLibroEjemplar);
}

export async function validarEjemplarExiste(id: number): Promise<void> {
    const ejemplar = await EjemplarRepository.obtenerPorId(id);
    if (!ejemplar || ejemplar.length === 0) {
        throw new NotFoundException("El ejemplar indicado no existe");
    }
}