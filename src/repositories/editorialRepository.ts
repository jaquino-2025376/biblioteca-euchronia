import {connection} from '../config/conexion';
import { Editorial } from '../models/editorial';

export class EditorialRepository {

    static async obtenerTodos() {
        const [rows]: any = await connection.query(
            "CALL sp_listar_editoriales()"
        );
        return rows[0];
    }

    static async obtenerPorId(id: number) {
        const [rows]: any = await connection.query(
            "CALL sp_obtener_editorial(?)",
            [id]
        );
        return rows[0];
    }

    static async crear(editorial: Editorial) {
        await connection.query(
            "CALL sp_insert_editorial(?,?)",
            [
                editorial.nombreEditorial,
                editorial.paisEditorial
            ]
        );
    }

    static async actualizar(id: number, editorial: Editorial) {
        await connection.query(
            "CALL sp_actualizar_editorial(?,?,?)",
            [
                id,
                editorial.nombreEditorial,
                editorial.paisEditorial
            ]
        );
    }

    static async eliminar(id: number) {
        await connection.query(
            "CALL sp_eliminar_editorial(?)",
            [id]
        );
    }
}

