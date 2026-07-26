import { connection } from '../config/conexion.js';
import { Rol } from '../models/rol.js';

export class RolRepository {

    static async obtenerTodos() {
        const [rows]: any = await connection.query(
            "CALL sp_listar_roles()"
        );
        return rows[0];
    }

    static async obtenerPorId(id: number) {
        const [rows]: any = await connection.query(
            "CALL sp_obtener_rol(?)",
            [id]
        );

        return rows[0];
    }

    static async crear(rol: Rol) {
        await connection.query(
            "CALL sp_insert_rol(?,?)",
            [
                rol.nombreRol,
                rol.fkIdUsuarioRol
            ]
        );
    }

    static async actualizar(id: number, rol: Rol) {
        await connection.query(
            "CALL sp_actualizar_rol(?,?,?)",
            [
                id,
                rol.nombreRol,
                rol.fkIdUsuarioRol
            ]
        );
    }

    static async eliminar(id: number) {
        await connection.query(
            "CALL sp_eliminar_rol(?)",
            [id]
        );
    }

}