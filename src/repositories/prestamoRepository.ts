import { connection } from '../config/conexion.js';
import { Prestamo } from '../models/prestamo.js';

export class PrestamoRepository {

    static async obtenerTodos() {
        const [rows]: any = await connection.query(
            "CALL sp_listar_prestamos()"
        );
        return rows[0];
    }

    static async obtenerPorId(id: number) {
        const [rows]: any = await connection.query(
            "CALL sp_obtener_prestamo(?)",
            [id]
        );
        return rows[0];
    }

    static async crear(prestamo: Prestamo) {
        await connection.query(
            "CALL sp_insert_prestamo(?,?,?,?,?,?)",
            [
                prestamo.fechaPrestamo,
                prestamo.fechaDevolucion,
                prestamo.estado,
                prestamo.cantidad,
                prestamo.fkIdUsuarioPrestamo,
                prestamo.fkIdLibroPrestamo
            ]
        );
    }

    static async actualizar(id: number, prestamo: Prestamo) {
        await connection.query(
            "CALL sp_actualizar_prestamo(?,?,?,?,?,?,?)",
            [
                id,
                prestamo.fechaPrestamo,
                prestamo.fechaDevolucion,
                prestamo.estado,
                prestamo.cantidad,
                prestamo.fkIdUsuarioPrestamo,
                prestamo.fkIdLibroPrestamo
            ]
        );
    }

    static async eliminar(id: number) {
        await connection.query(
            "CALL sp_eliminar_prestamo(?)",
            [id]
        );
    }

}
