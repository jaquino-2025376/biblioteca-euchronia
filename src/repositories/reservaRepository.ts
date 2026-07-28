import { connection } from '../config/conexion.js';
import { Reserva } from '../models/reserva.js';

export class ReservaRepository {

    static async obtenerTodos() {
        const [rows]: any = await connection.query(
            "CALL sp_listar_reservas()"
        );
        return rows[0];
    }

    static async obtenerPorId(id: number) {
        const [rows]: any = await connection.query(
            "CALL sp_obtener_reserva(?)",
            [id]
        );
        return rows[0];
    }

    static async crear(reserva: Reserva) {
        await connection.query(
            "CALL sp_insert_reserva(?,?,?,?)",
            [
                reserva.fechaReserva,
                reserva.estado,
                reserva.fkIdUsuarioReserva,
                reserva.fkIdLibroReserva
            ]
        );
    }

    static async actualizar(id: number, reserva: Reserva) {
        await connection.query(
            "CALL sp_actualizar_reserva(?,?,?,?,?)",
            [
                id,
                reserva.fechaReserva,
                reserva.estado,
                reserva.fkIdUsuarioReserva,
                reserva.fkIdLibroReserva
            ]
        );
    }

    static async eliminar(id: number) {
        await connection.query(
            "CALL sp_eliminar_reserva(?)",
            [id]
        );
    }

}
