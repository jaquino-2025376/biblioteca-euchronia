import { ValidationException } from "../exceptions/validationException.js";
import { NotFoundException } from "../exceptions/notFoundException.js";
import { ReseniaRepository } from "../repositories/reseniaRepository.js";
import { validarUsuarioExiste } from "./usuarioValidator.js";
import { validarLibroExiste } from "./libroValidator.js";

export function validarCamposResenia(datos: any): void {
    if (!datos.comentario) {
        throw new ValidationException("comentario es obligatorio");
    }
    if (typeof datos.comentario !== "string" || datos.comentario.trim().length === 0) {
        throw new ValidationException("comentario debe ser un texto no vacío");
    }
    if (datos.comentario.length > 350) {
        throw new ValidationException("comentario no puede tener más de 350 caracteres");
    }

    if (datos.calificacion === undefined || datos.calificacion === null) {
        throw new ValidationException("calificacion es obligatoria");
    }
    if (!Number.isInteger(datos.calificacion) || datos.calificacion < 1 || datos.calificacion > 5) {
        throw new ValidationException("calificacion debe ser un número entero entre 1 y 5");
    }

    if (!datos.fkIdUsuarioResenia || !Number.isInteger(datos.fkIdUsuarioResenia)) {
        throw new ValidationException("fkIdUsuarioResenia es obligatorio y debe ser un número entero");
    }
    if (!datos.fkIdLibroResenia || !Number.isInteger(datos.fkIdLibroResenia)) {
        throw new ValidationException("fkIdLibroResenia es obligatorio y debe ser un número entero");
    }
}

export async function validarRelacionesResenia(datos: any): Promise<void> {
    await validarUsuarioExiste(datos.fkIdUsuarioResenia);
    await validarLibroExiste(datos.fkIdLibroResenia);
}

export async function validarReseniaExiste(id: number): Promise<void> {
    const resenia = await ReseniaRepository.obtenerPorId(id);
    if (!resenia || resenia.length === 0) {
        throw new NotFoundException("La reseña indicada no existe");
    }
}
