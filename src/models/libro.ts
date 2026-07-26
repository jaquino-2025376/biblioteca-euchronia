export interface libro{
    idLibro: number;
    titulo: string;
    anioPublicacion: number;
    stockFisico: number;
    archivoDigital: string;
    fkIdAutorLibro: number;
    fkIdCategoriaLibro: number;
    fkIdEditorialLibro: number;
}