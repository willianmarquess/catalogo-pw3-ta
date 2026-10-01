import { Request, Response } from "express";
import { Item } from "../models/Item";

const tiposItem = ['LIVRO', 'FILME', 'ANIME', 'SERIE', 'JOGO'];

export class ItemController {
    static carregarCadastrar(req: Request, res: Response) {
        return res.render('pages/item/cadastrar', {
            titulo: 'Cadastrar Item',
            mensagem: null,
            tiposItem
        });
    }

    static async cadastrar(req: Request, res: Response) {
        const { tipo, titulo, sinopse, dataLancamento } = req.body;
        const { usuario } = req.session as any;
        const { filename } = (req as any).file;

        if (!tipo || !titulo || !tiposItem.includes(tipo)) {
            return res.render('pages/item/cadastrar', {
                titulo: 'Cadastrar Item',
                tiposItem,
                mensagem: {
                    tipo: 'error',
                    valor: 'Preencha todos os campos obrigatórios corretamente',
                    titulo: 'Dados inválidos'
                }
            }); 
        }

        const item = new Item({
            tipo,
            titulo,
            sinopse,
            dataLancamento,
            imagem: filename,
            status: 'PENDENTE',
            criadoPor: usuario.id
        });

        await Item.cadastrar(item);

        return res.render('pages/item/cadastrar', {
            titulo: 'Cadastrar Item',
            mensagem: {
                tipo: 'success',
                valor: 'Item cadastrado com sucesso!',
                titulo: 'Sucesso'
            },
            tiposItem
        });

    }
}