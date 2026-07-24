export interface Reserva{
    idReserva: number;
    fechaReserva: Date;
    estado: estadoReserva;
}

export enum estadoReserva {
    nueva = "NUEVA",
    confirmada = "CONFIRMADA",
    operacional = "FINALIZADA",
    completada = "COMPLETADA",
    cancelada = "CANCELADA",
    clienteNoAsiste = "CLIENTE_NO_RECOGIO_LIBRO",
}