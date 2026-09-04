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

    static async buscarTodos() {
        const { rows } = await connection.query(`select * from categoria;`);
        return rows.map((row) => new Categoria({
            id: row.id,
            nome: row.nome
        }));
    }

    static async deletarPorId(id: string) {
        await connection.query('DELETE FROM categoria WHERE id=$1', [id]);
    }

    static async buscarPorId(id: string) {
        const { rows } = await connection.query('SELECT * FROM categoria WHERE id=$1', [id]);

        if (rows.length <= 0) {
            return null;
        }

        return new Categoria({
            id: rows[0].id,
            nome: rows[0].nome
        });
    }

    static async atualizar(categoria: Categoria) {
        await connection.query('UPDATE categoria SET nome=$1 WHERE id=$2;', [
            categoria.nome,
            categoria.id
        ]);
    }
}