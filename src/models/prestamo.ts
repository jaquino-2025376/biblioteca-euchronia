export interface Prestamo {
    idPrestamo: number;
    fechaPrestamo: Date;
    fechaDevolucion: Date;
    estado: estadoPrestamo;
    cantidad: number;
    fkIdUsuarioPrestamo: number;
    fkLibroPrestamo: number;
}

export enum estadoPrestamo {
  activo = "ACTIVO",
  devuelto = "DEVUELTO",
  retrasado = "retrasado"
}