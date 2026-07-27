import { ValidationException } from "../exceptions/validationException.js";
import { NotFoundException } from "../exceptions/notFoundException.js";
import { LibroRepository } from "../repositories/libroRepository.js";
import { validarAutorExiste } from "./autorValidator.js";
import { validarCategoriaExiste } from "./categoriaValidator.js";
import { validarEditorialExiste } from "./editorialValidator.js";

export function validarCamposLibro(datos: any): void {
    if (!datos.titulo) {
        throw new ValidationException("titulo es obligatorio");
    }
    if (typeof datos.titulo !== "string" || datos.titulo.trim().length === 0) {
        throw new ValidationException("titulo debe ser un texto no vacío");
    }
    if (datos.titulo.length > 100) {
        throw new ValidationException("titulo no puede tener más de 100 caracteres");
    }

    if (datos.anioPublicacion === undefined || datos.anioPublicacion === null) {
        throw new ValidationException("anioPublicacion es obligatorio");
    }
    if (!Number.isInteger(datos.anioPublicacion)) {
        throw new ValidationException("anioPublicacion debe ser un número entero");
    }
    // MySQL YEAR solo acepta 1901-2155
    if (datos.anioPublicacion < 1901 || datos.anioPublicacion > 2155) {
        throw new ValidationException("anioPublicacion debe estar entre 1901 y 2155");
    }

    if (datos.stockFisico === undefined || datos.stockFisico === null) {
        throw new ValidationException("stockFisico es obligatorio");
    }
    if (!Number.isInteger(datos.stockFisico) || datos.stockFisico < 0) {
        throw new ValidationException("stockFisico debe ser un número entero mayor o igual a 0");
    }

    if (datos.archivoDigital !== undefined && datos.archivoDigital !== null) {
        if (typeof datos.archivoDigital !== "string") {
            throw new ValidationException("archivoDigital debe ser un texto");
        }
        if (datos.archivoDigital.length > 100) {
            throw new ValidationException("archivoDigital no puede tener más de 100 caracteres");
        }
    }

    if (!datos.fkIdAutorLibro || !Number.isInteger(datos.fkIdAutorLibro)) {
        throw new ValidationException("fkIdAutorLibro es obligatorio y debe ser un número entero");
    }
    if (!datos.fkIdCategoriaLibro || !Number.isInteger(datos.fkIdCategoriaLibro)) {
        throw new ValidationException("fkIdCategoriaLibro es obligatorio y debe ser un número entero");
    }
    if (!datos.fkIdEditorialLibro || !Number.isInteger(datos.fkIdEditorialLibro)) {
        throw new ValidationException("fkIdEditorialLibro es obligatorio y debe ser un número entero");
    }
}

export async function validarRelacionesLibro(datos: any): Promise<void> {
    await validarAutorExiste(datos.fkIdAutorLibro);
    await validarCategoriaExiste(datos.fkIdCategoriaLibro);
    await validarEditorialExiste(datos.fkIdEditorialLibro);
}

export async function validarLibroExiste(id: number): Promise<void> {
    const libro = await LibroRepository.obtenerPorId(id);
    if (!libro || libro.length === 0) {
        throw new NotFoundException("El libro indicado no existe");
    }
}