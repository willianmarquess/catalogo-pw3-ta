import { connection } from "../infra/Connection";

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

    constructor(params: Item) {
        this.id = params.id;
        this.titulo = params.titulo;
        this.tipo = params.tipo;
        this.sinopse = params.sinopse;
        this.dataLancamento = params.dataLancamento;
        this.imagem = params.imagem;
        this.status = params.status;
        this.criadoPor = params.criadoPor;
        this.criadoEm = params.criadoEm;
        this.aprovadoPor = params.aprovadoPor;
    }

    static async cadastrar(item: Item) {
        await connection.query(`INSERT INTO item(tipo, titulo, sinopse, data_lancamento, imagem, status, criado_por) VALUES ($1, $2, $3, $4, $5, $6, $7);`,
            [
                item.tipo,
                item.titulo,
                item.sinopse,
                item.dataLancamento,
                item.imagem,
                item.status,
                item.criadoPor,
            ]
        );
    }
}