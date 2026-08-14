import { Request, Response } from "express";
import { Categoria } from "../models/Categoria";

export class CategoriaController {
    static carregarCadastrar(req: Request, res: Response) {
        const { usuario } = req.session as any;

        return res.render('pages/categoria/cadastrar', {
            titulo: 'Cadastrar Categoria',
            mensagem: null,
            usuario
        });
    }

    static async cadastrar(req: Request, res: Response) {
        const { usuario } = req.session as any;
        const { nome } = req.body;

        if (!nome) {
            return res.render('pages/categoria/cadastrar', {
                titulo: 'Cadastrar Categoria',
                usuario,
                mensagem: {
                    tipo: 'error',
                    valor: 'Preencha todos os campos corretamente',
                    titulo: 'Dados inválidos'
                }
            });
        }

        const categoria = new Categoria({
            nome
        });

        await Categoria.cadastrar(categoria);

        return res.render('pages/categoria/cadastrar', {
            titulo: 'Cadastrar Categoria',
            usuario,
            mensagem: {
                tipo: 'success',
                valor: 'Categoria cadastrada com sucesso!',
                titulo: 'Sucesso'
            }
        });
    }
}