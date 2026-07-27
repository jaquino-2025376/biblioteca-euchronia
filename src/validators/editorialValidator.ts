import {ValidationException} from '../exceptions/validationException.js';
import {NotFoundException} from '../exceptions/notFoundException.js';
import {EditorialRepository} from '../repositories/editorialRepository.js';

export function validarCamposEditorial(datos: any): void {
    if (!datos.nombreEditorial) {
        throw new ValidationException("nombreEditorial es obligatorio");
    }
    if (!datos.paisEditorial) {
        throw new ValidationException("paisEditorial es obligatorio");
    }
    if (typeof datos.nombreEditorial !== "string" || datos.nombreEditorial.trim().length === 0) {
        throw new ValidationException("nombreEditorial debe ser un texto no vacío");
    }
    if (typeof datos.paisEditorial !== "string" || datos.paisEditorial.trim().length === 0) {
        throw new ValidationException("paisEditorial debe ser un texto no vacío");
    }
    if (datos.nombreEditorial.length > 50) {
        throw new ValidationException("nombreEditorial no puede tener más de 50 caracteres");
    }
    if (datos.paisEditorial.length > 50) {
        throw new ValidationException("paisEditorial no puede tener más de 50 caracteres");
    }
}

export async function validarEditorialExiste(id: number): Promise<void> {
    const editorial = await EditorialRepository.obtenerPorId(id);
    if (!editorial || editorial.length === 0) {
        throw new NotFoundException("La editorial indicada no existe");
    }
}