import { Request, Response } from "express";

export class CategoriaController {
    static carregarCadastrar(req: Request, res: Response) {
        const { usuario } = req.session as any;

        return res.render('pages/categoria/cadastrar', {
            titulo: 'Cadastrar Categoria',
            mensagem: null,
            usuario
        });
    }
}