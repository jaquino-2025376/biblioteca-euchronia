import {connection} from '../config/conexion';
import { Autor } from '../models/autor';

export class AutorRepository {

    static async obtenerTodos() {
        const [rows]: any = await connection.query(
            "CALL sp_listar_autores()"
        );
        return rows[0];
    }

    static async obtenerPorId(id: number) {
        const [rows]: any = await connection.query(
            "CALL sp_obtener_autor(?)",
            [id]
        );
        return rows[0];
    }

    static async crear(autor: Autor) {
        await connection.query(
            "CALL sp_insert_autor(?,?,?)",
            [
                autor.nombreAutor,
                autor.nacionalidad,
                autor.fechaNacimiento
            ]
        );
    }

    static async actualizar(id: number, autor: Autor) {
        await connection.query(
            "CALL sp_actualizar_autor(?,?,?,?)",
            [
                id,
                autor.nombreAutor,
                autor.nacionalidad,
                autor.fechaNacimiento
            ]
        );
    }

    static async eliminar(id: number) {
        await connection.query(
            "CALL sp_eliminar_autor(?)",
            [id]
        );
    }
}