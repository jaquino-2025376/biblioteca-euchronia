export interface Prestamo {
    idPrestamo: number;
    fechaPrestamo: Date;
    fechaDevolucion: Date;
    estado: estadoPrestamo;
    cantidad: number;
    fkIdUsuarioPrestamo: number;
    fkIdLibroPrestamo: number;
}

export enum estadoPrestamo {
  activo = "ACTIVO",
  devuelto = "DEVUELTO",
  retrasado = "retrasado"
}