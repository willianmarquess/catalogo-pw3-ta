export class Item {
    id?: number;
    tipo: string;
    titulo: string;
    sinopse: string;
    dataLancamento: string;
    imagem: string;
    status: string;
    criadoPor: number;
    criadoEm?: string;
    aprovadoPor?: number;

    constructor({
        id, tipo, titulo, sinopse, dataLancamento, imagem, status, criadoPor,
        criadoEm, aprovadoPor
    }: {
        id?: number;
        tipo: string;
        titulo: string;
        sinopse: string;
        dataLancamento: string;
        imagem: string;
        status: string;
        criadoPor: number;
        criadoEm: string;
        aprovadoPor?: number;
    }) {

    }
}