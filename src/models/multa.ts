export interface multa {
    idMulta: number;
    monto: number;
    motivo: string;
    fechaGeneracion: Date;
    estado: estadoMulta;
}

export enum estadoMulta {
  pendiente = "PENDIENTE",
  pagada = "PAGADA",
  cancelada = "CANCELADA"
}