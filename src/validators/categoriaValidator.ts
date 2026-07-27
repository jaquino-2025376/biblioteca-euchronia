import { ValidationException } from "../exceptions/validationException.js";
import { NotFoundException } from "../exceptions/notFoundException.js";
import { CategoriaRepository } from "../repositories/categoriaRepository.js";

export function validarCamposCategoria(datos: any): void {
    if (!datos.nombreCategoria) {
        throw new ValidationException("nombreCategoria es obligatorio");
    }

    if (!datos.descripcion) {
        throw new ValidationException("descripcion es obligatoria");
    }

    if (typeof datos.nombreCategoria !== "string" || datos.nombreCategoria.trim().length === 0) {
        throw new ValidationException("nombreCategoria debe ser un texto no vacío");
    }

    if (typeof datos.descripcion !== "string" || datos.descripcion.trim().length === 0) {
        throw new ValidationException("descripcion debe ser un texto no vacío");
    }

    if (datos.nombreCategoria.length > 50) {
        throw new ValidationException("nombreCategoria no puede tener más de 50 caracteres");
    }

    if (datos.descripcion.length > 100) {
        throw new ValidationException("descripcion no puede tener más de 100 caracteres");
    }
}

export async function validarCategoriaExiste(id: number): Promise<void> {
    const categoria = await CategoriaRepository.obtenerPorId(id);

    if (!categoria || categoria.length === 0) {
        throw new NotFoundException("La categoría indicada no existe");
    }
}