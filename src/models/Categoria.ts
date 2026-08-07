import { connection } from "../infra/Connection";

export class Categoria {
    id?: number;
    nome: string;

    constructor({ id, nome }: { id?: number, nome: string }) {
        this.id = id;
        this.nome = nome;
    }

    static async cadastrar(categoria: Categoria) {
        await connection.query(
            'INSERT INTO categoria (nome) VALUES ($1);', 
            [categoria.nome]
        );
    }
}