import { Usuario } from "../models/Usuario";

export function authMiddleware(tiposPermitidos: string[] = []) {
    return async function (req: any, res: any, next: any) {
        if (!req.session?.usuario) {
            return res.redirect('/usuario/logar');
        }

        const usuarioAtualizado = await Usuario.buscarPorId(req.session.usuario.id);

        if (!usuarioAtualizado) {
            return res.redirect('/usuario/logar');
        }

        const usuarioLocal = {
            id: usuarioAtualizado.id,
            nome: usuarioAtualizado.nome,
            email: usuarioAtualizado.email,
            tipo: usuarioAtualizado.tipo.nome
        };

        req.session.usuario = usuarioLocal;
        res.locals.usuario = usuarioLocal;

        if (tiposPermitidos.length > 0 && !tiposPermitidos.includes(usuarioLocal.tipo)) {
            return res.redirect('/dashboard');
        }

        return next();
    }
}
