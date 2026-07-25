import { connection } from "../config/conexion.js";
import { Usuario } from "../models/usuario.js";

export class UsuarioRepository {

    static async obtenerTodos() {
        const [rows] = await connection.query("CALL sp_listar_usuarios()");
        return rows;
    }

    static async crear(usuario: Usuario) {
        await connection.query(
            "CALL sp_insert_usuario(?,?,?,?,?)",
            [
                usuario.nombre,
                usuario.apellido,
                usuario.correo,
                usuario.telefono,
                usuario.fechaRegistro
            ]
        );
    }

    static async actualizar(id: number, usuario: Usuario) {
        await connection.query(
            "CALL sp_actualizar_usuario(?,?,?,?,?,?)",
            [
                id,
                usuario.nombre,
                usuario.apellido,
                usuario.correo,
                usuario.telefono,
                usuario.fechaRegistro
            ]
        );
    }

    static async eliminar(id: number) {
        await connection.query(
            "CALL sp_eliminar_usuario(?)",
            [id]
        );
    }
}