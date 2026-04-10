import { Router } from 'express';
import { UsuarioController } from '../controllers/UsuarioController';
import { authMiddleware } from '../middlewares/AuthMiddleware';

const userRoutes = Router();

userRoutes.get('/usuario/logar', UsuarioController.carregarLogin);
userRoutes.post('/usuario/cadastrar', UsuarioController.cadastrar);

userRoutes.post('/usuario/logar', UsuarioController.logar);
userRoutes.post('/usuario/deslogar', UsuarioController.deslogar);

userRoutes.get('/usuario/perfil', authMiddleware, UsuarioController.carregarPerfil);
userRoutes.post('/usuario/perfil', authMiddleware, UsuarioController.atualizarPerfil);
userRoutes.get('/usuario/listar', authMiddleware, UsuarioController.carregarListar);
userRoutes.post('/usuario/excluir/:id', authMiddleware, UsuarioController.excluir);
userRoutes.get('/usuario/editar/:id', authMiddleware, UsuarioController.carregarEditar);

export {
    userRoutes
}