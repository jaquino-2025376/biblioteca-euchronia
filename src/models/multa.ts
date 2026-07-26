export interface multa {
    idMulta: number;
    monto: number;
    motivo: string;
    fechaGeneracion: Date;
    estado: estadoMulta;
    fkIdPrestamoMulta: number;
}

export enum estadoMulta {
  pendiente = "PENDIENTE",
  pagada = "PAGADA",
  cancelada = "CANCELADA"
}