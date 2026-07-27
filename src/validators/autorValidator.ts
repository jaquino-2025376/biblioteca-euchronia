import { ValidationException } from "../exceptions/validationException.js";
import { NotFoundException } from "../exceptions/notFoundException.js";
import { AutorRepository } from "../repositories/autorRepository.js";

export function validarCamposAutor(datos: any): void {
    if (!datos.nombreAutor) {
        throw new ValidationException("nombreAutor es obligatorio");
    }
    if (!datos.nacionalidad) {
        throw new ValidationException("nacionalidad es obligatoria");
    }
    if (!datos.fechaNacimiento) {
        throw new ValidationException("fechaNacimiento es obligatoria");
    }

    if (typeof datos.nombreAutor !== "string" || datos.nombreAutor.trim().length === 0) {
        throw new ValidationException("nombreAutor debe ser un texto no vacío");
    }
    if (datos.nombreAutor.length > 50) {
        throw new ValidationException("nombreAutor no puede tener más de 50 caracteres");
    }

    if (typeof datos.nacionalidad !== "string" || datos.nacionalidad.trim().length === 0) {
        throw new ValidationException("nacionalidad debe ser un texto no vacío");
    }
    if (datos.nacionalidad.length > 50) {
        throw new ValidationException("nacionalidad no puede tener más de 50 caracteres");
    }

    if (isNaN(Date.parse(datos.fechaNacimiento))) {
        throw new ValidationException("fechaNacimiento debe ser una fecha válida");
    }
    if (new Date(datos.fechaNacimiento) > new Date()) {
        throw new ValidationException("fechaNacimiento no puede ser una fecha futura");
    }
}

export async function validarAutorExiste(id: number): Promise<void> {
    const autor = await AutorRepository.obtenerPorId(id);
    if (!autor || autor.length === 0) {
        throw new NotFoundException("El autor indicado no existe");
    }
}