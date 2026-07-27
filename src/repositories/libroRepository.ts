import {connection} from '../config/conexion';
import {libro} from '../models/libro';

export class LibroRepository {

    static async obtenerTodos() {
        const [rows]: any = await connection.query(
            "CALL sp_listar_libros()"
        );
        return rows[0];
    }

    static async obtenerPorId(id: number) {
        const [rows]: any = await connection.query(
            "CALL sp_obtener_libro(?)",
            [id]
        );
        return rows[0];
    }

    static async crear(libro: libro) {
        await connection.query(
            "CALL sp_insert_libro(?,?,?,?,?,?,?)",
            [
                libro.titulo,
                libro.anioPublicacion,
                libro.stockFisico,
                libro.archivoDigital,
                libro.fkIdAutorLibro,
                libro.fkIdCategoriaLibro,
                libro.fkIdEditorialLibro
            ]
        );
    }

    static async actualizar(id: number, libro: libro) {
        await connection.query(
            "CALL sp_actualizar_libro(?,?,?,?,?,?,?,?)",
            [
                id,
                libro.titulo,
                libro.anioPublicacion,
                libro.stockFisico,
                libro.archivoDigital,
                libro.fkIdAutorLibro,
                libro.fkIdCategoriaLibro,
                libro.fkIdEditorialLibro
            ]
        );
    }

    static async eliminar(id: number) {
        await connection.query(
            "CALL sp_eliminar_libro(?)",
            [id]
        );
    }
}