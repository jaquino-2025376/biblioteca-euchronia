import mysql from 'mysql2/promise';

export const connection = mysql.createPool({
  host: process.env.DB_HOST ?? 'localhost',
  user: process.env.DB_USER ?? 'root',
  password: process.env.DB_PASSWORD ?? 'Timetravel10**',
  database: process.env.DB_NAME ?? 'biblioteca_euchronia_in5cm',
  port: Number(process.env.DB_PORT ?? 3306),
  waitForConnections: true,
  connectionLimit: 10,
});

export async function verificarConexion(): Promise<void> {
  const conexion = await connection.getConnection();
  try {
    await conexion.ping();
    console.log('Conexión a la base de datos establecida correctamente.');
  } finally {
    conexion.release();
  }
}