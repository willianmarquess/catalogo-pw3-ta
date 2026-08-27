import { Request, Response } from "express";
import { Categoria } from "../models/Categoria";

export class CategoriaController {
    static carregarCadastrar(req: Request, res: Response) {
        return res.render('pages/categoria/cadastrar', {
            titulo: 'Cadastrar Categoria',
            mensagem: null
        });
    }

    static async cadastrar(req: Request, res: Response) {
        const { nome } = req.body;

        if (!nome) {
            return res.render('pages/categoria/cadastrar', {
                titulo: 'Cadastrar Categoria',
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
            mensagem: {
                tipo: 'success',
                valor: 'Categoria cadastrada com sucesso!',
                titulo: 'Sucesso'
            }
        });
    }

    static async carregarListar(req: Request, res: Response) {
        const categorias = await Categoria.buscarTodos();

        res.render('pages/categoria/listar', {
            categorias,
            titulo: 'Listar Usuários',
            mensagem: null
        });
    }
}