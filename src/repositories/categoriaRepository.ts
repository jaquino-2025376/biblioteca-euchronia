import { connection } from '../config/conexion';
import { Categoria } from '../models/categoria';

export class CategoriaRepository {

    static async obtenerTodos() {
        const [rows]: any = await connection.query(
            "CALL sp_listar_categorias()"
        );
        return rows[0];
    }

    static async obtenerPorId(id: number) {
        const [rows]: any = await connection.query(
            "CALL sp_obtener_categoria(?)",
            [id]
        );
        return rows[0];
    }

    static async crear(categoria: Categoria) {
        await connection.query(
            "CALL sp_insert_categoria(?,?)",
            [
                categoria.nombreCategoria,
                categoria.descripcion
            ]
        );
    }

    static async actualizar(id: number, categoria: Categoria) {
        await connection.query(
            "CALL sp_actualizar_categoria(?,?,?)",
            [
                id,
                categoria.nombreCategoria,
                categoria.descripcion
            ]
        );
    }

    static async eliminar(id: number) {
        await connection.query(
            "CALL sp_eliminar_categoria(?)",
            [id]
        );
    }
}