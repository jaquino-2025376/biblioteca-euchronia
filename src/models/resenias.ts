export interface Resenias{
    idResenia: number;
    comentario: string;
    calificacion: number;
    fkIdUsuarioResenia: number;
    fkIdLibroResenia: number;
}