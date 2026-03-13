// Controle
// 1. receber as requições HTTP
// 2. validar dados
// 3. validar regras de negócio
// 4. comunicar com a camada MODEL

import { Request, Response } from "express";
import { Usuario } from "../models/Usuario";
import { TipoUsuario } from "../enums/TipoUsuario";

//Parte 1 -> funções que carregam páginas

//função que carrega a página de login

export class UsuarioController {

    static carregarLogin(req: Request, res: Response) {
        res.render('login', {
            mensagem: null
        });
    }
    //função que carrega a página de listagem de usuários
    static async carregarListar(req: Request, res: Response) {
        const { usuario } =  req.session as any;

        const usuarios = await Usuario.buscarTodos();

        res.render('pages/usuario/listar', {
            mensagem: null,
            usuarios,
            usuario,
            titulo: 'Listar Usuários'
        });
    }

    //Parte 2 -> funções do CRUD

    static async cadastrar(req: Request, res: Response) {
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.render('login', {
                mensagem: {
                    tipo: 'error',
                    valor: 'Preencha corretamente os dados!',
                    titulo: 'Dados inválidos'
                }
            });
        }

        const usuarioEncontrado = await Usuario.buscarPorEmail(email);

        if (usuarioEncontrado) {
            return res.render('login', {
                mensagem: {
                    tipo: 'error',
                    valor: 'E-mail já existe',
                    titulo: 'Dados inválidos'
                }
            });
        }

        const usuario: Usuario = new Usuario({
            nome,
            email,
            senha,
            tipo: TipoUsuario.USUARIO
        });

        await Usuario.cadastrar(usuario);

        res.render('login', {
            mensagem: {
                tipo: 'success',
                valor: 'Usuário cadastrado com sucesso',
                titulo: 'Sucesso'
            }
        });
    }

    static async logar(req: Request, res: Response) {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.render('login', {
                mensagem: {
                    tipo: 'error',
                    valor: 'Preencha todos os campos corretamente',
                    titulo: 'Dados inválidos'
                }
            });
        }

        const usuario = await Usuario.buscarPorEmailESenha(email, senha);

        if (!usuario) {
            return res.render('login', {
                mensagem: {
                    tipo: 'error',
                    valor: 'E-mail ou senha incorretos',
                    titulo: 'Dados inválidos'
                }
            });
        }

        (req.session as any).usuario = {
            nome: usuario.nome,
            email: usuario.email,
            id: usuario.id,
            tipo: usuario.tipo
        }

        return res.redirect('/dashboard');
    }

    static async deslogar(req: Request, res: Response) {
        req.session.destroy(() => {
            res.redirect('/usuario/logar');
        });
    }

    static carregarUsuarios(req: Request, res: Response) {
        const { usuario } = req.session as any;
        res.render('usuarios', { usuario });
    }

    static async carregarPerfil(req: Request, res: Response) {
        const { usuario } = req.session as any;

        const usuarioEncontrado = await Usuario.buscarPorId(usuario.id);

        if (!usuarioEncontrado) {
            return res.redirect('/usuario/logar');
        }

        res.render('pages/usuario/perfil', { 
            usuario: usuarioEncontrado, 
            titulo: 'Perfil',
            mensagem: null 
        });
    }

    static async atualizarPerfil(req: Request, res: Response) {
        const { usuario } = req.session as any;
        const { nome, email, senha } = req.body;

        const usuarioEncontrado = await Usuario.buscarPorId(usuario.id);

        if (!usuarioEncontrado) {
            return res.redirect('/usuario/logar');
        }

        if (!nome || !email || !senha) {
            return res.render('pages/usuario/perfil', {
                usuario: usuarioEncontrado,
                titulo: 'Perfil',
                mensagem: {
                    tipo: 'error',
                    valor: 'Preencha todos os campos corretamente',
                    titulo: 'Dados inválidos'
                }
            });
        }

        usuarioEncontrado.nome = nome;
        usuarioEncontrado.email = email;
        usuarioEncontrado.senha = senha;

        await Usuario.atualizar(usuarioEncontrado);

        (req.session as any).usuario = {
            nome: usuarioEncontrado.nome,
            email: usuarioEncontrado.email,
            id: usuarioEncontrado.id,
            tipo: usuarioEncontrado.tipo
        }

        return res.render('pages/usuario/perfil', {
            usuario: usuarioEncontrado,
            titulo: 'Perfil',
            mensagem: {
                tipo: 'success',
                valor: 'Perfil salvo com sucesso!',
                titulo: 'Perfil salvo'
            }
        });
    }
} 
