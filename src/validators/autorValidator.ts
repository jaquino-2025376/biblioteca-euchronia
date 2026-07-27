import {ValidationException} from '../exceptions/validationException';
import {NotFoundException} from '../exceptions/notFoundException';
import {EditorialRepository} from '../repositories/editorialRepository';

export function validarCamposAutor(datos: any): void {
    if (!datos.nombre) {
        throw new ValidationException("nombre es obligatorio");
    }
    if (!datos.apellido) {
        throw new ValidationException("apellido es obligatorio");
    }
    if (typeof datos.nombre !== "string" || datos.nombre.trim().length === 0) {
        throw new ValidationException("nombre debe ser un texto no vacío");
    }
    if (typeof datos.apellido !== "string" || datos.apellido.trim().length === 0) {
        throw new ValidationException("apellido debe ser un texto no vacío");
    }
    if (datos.nombre.length > 50) {
        throw new ValidationException("nombre no puede tener más de 50 caracteres");
    }
    if (datos.apellido.length > 50) {
        throw new ValidationException("apellido no puede tener más de 50 caracteres");
    }
    if (datos.biografia && typeof datos.biografia !== "string") {
        throw new ValidationException("biografia debe ser un texto");
    }
    if (datos.biografia && datos.biografia.length > 500) {
        throw new ValidationException("biografia no puede tener más de 500 caracteres");
    }
    if (datos.nacionalidad && typeof datos.nacionalidad !== "string") {
        throw new ValidationException("nacionalidad debe ser un texto");
    }
    if (datos.nacionalidad && datos.nacionalidad.length > 50) {
        throw new ValidationException("nacionalidad no puede tener más de 50 caracteres");
    }
    if (datos.fechaNacimiento && isNaN(Date.parse(datos.fechaNacimiento))) {
        throw new ValidationException("fechaNacimiento debe ser una fecha válida");
    }
    if (datos.fechaNacimiento && new Date(datos.fechaNacimiento) > new Date("2027-01-01")) {
        throw new ValidationException("fechaNacimiento no puede ser una fecha futura");
    }
}

export async function validarAutorExiste(id: number): Promise<void> {
    const autor = await EditorialRepository.obtenerPorId(id);
    if (!autor || autor.length === 0) {
        throw new NotFoundException("El autor indicado no existe");
    }
}