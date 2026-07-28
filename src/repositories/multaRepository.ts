import { connection } from '../config/conexion.js';
import { multa } from '../models/multa.js';

export class MultaRepository {

    static async obtenerTodos() {
        const [rows]: any = await connection.query(
            "CALL sp_listar_multas()"
        );
        return rows[0];
    }

    static async obtenerPorId(id: number) {
        const [rows]: any = await connection.query(
            "CALL sp_obtener_multa(?)",
            [id]
        );
        return rows[0];
    }

    static async crear(multa: multa) {
        await connection.query(
            "CALL sp_insert_multa(?,?,?,?,?)",
            [
                multa.monto,
                multa.motivo,
                multa.fechaGeneracion,
                multa.estado,
                multa.fkIdPrestamoMulta
            ]
        );
    }

    static async actualizar(id: number, multa: multa) {
        await connection.query(
            "CALL sp_actualizar_multa(?,?,?,?,?,?)",
            [
                id,
                multa.monto,
                multa.motivo,
                multa.fechaGeneracion,
                multa.estado,
                multa.fkIdPrestamoMulta
            ]
        );
    }

    static async eliminar(id: number) {
        await connection.query(
            "CALL sp_eliminar_multa(?)",
            [id]
        );
    }

}
