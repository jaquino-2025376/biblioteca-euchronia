import { connection } from '../config/conexion.js';
import { Resenias } from '../models/resenias.js';

export class ReseniaRepository {

    static async obtenerTodos() {
        const [rows]: any = await connection.query(
            "CALL sp_listar_resenias()"
        );
        return rows[0];
    }

    static async obtenerPorId(id: number) {
        const [rows]: any = await connection.query(
            "CALL sp_obtener_resenia(?)",
            [id]
        );
        return rows[0];
    }

    static async crear(resenia: Resenias) {
        await connection.query(
            "CALL sp_insert_resenia(?,?,?,?)",
            [
                resenia.comentario,
                resenia.calificacion,
                resenia.fkIdUsuarioResenia,
                resenia.fkIdLibroResenia
            ]
        );
    }

    static async actualizar(id: number, resenia: Resenias) {
        await connection.query(
            "CALL sp_actualizar_resenia(?,?,?,?,?)",
            [
                id,
                resenia.comentario,
                resenia.calificacion,
                resenia.fkIdUsuarioResenia,
                resenia.fkIdLibroResenia
            ]
        );
    }

    static async eliminar(id: number) {
        await connection.query(
            "CALL sp_eliminar_resenia(?)",
            [id]
        );
    }

}
