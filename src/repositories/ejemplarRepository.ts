import { connection } from '../config/conexion.js';
import { Ejemplar } from '../models/ejemplar.js';

export class EjemplarRepository {

    static async obtenerTodos() {
        const [rows]: any = await connection.query(
            "CALL sp_listar_ejemplares()"
        );
        return rows[0];
    }

    static async obtenerPorId(id: number) {
        const [rows]: any = await connection.query(
            "CALL sp_obtener_ejemplar(?)",
            [id]
        );
        return rows[0];
    }

    static async crear(ejemplar: Ejemplar) {
        await connection.query(
            "CALL sp_insert_ejemplar(?,?,?)",
            [
                ejemplar.estado,
                ejemplar.fechaAdquisicion,
                ejemplar.fkIdLibroEjemplar
            ]
        );
    }

    static async actualizar(id: number, ejemplar: Ejemplar) {
        await connection.query(
            "CALL sp_actualizar_ejemplar(?,?,?,?)",
            [
                id,
                ejemplar.estado,
                ejemplar.fechaAdquisicion,
                ejemplar.fkIdLibroEjemplar
            ]
        );
    }

    static async eliminar(id: number) {
        await connection.query(
            "CALL sp_eliminar_ejemplar(?)",
            [id]
        );
    }
}