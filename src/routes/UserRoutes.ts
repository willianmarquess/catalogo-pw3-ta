import { Router } from 'express';
import { UsuarioController } from '../controllers/UsuarioController';
import { authMiddleware } from '../middlewares/AuthMiddleware';

const userRoutes = Router();

userRoutes.get('/usuario/logar', UsuarioController.carregarLogin);
userRoutes.get('/usuario/listar', UsuarioController.carregarListar);
userRoutes.post('/usuario/cadastrar', UsuarioController.cadastrar);

userRoutes.post('/usuario/logar', UsuarioController.logar);
userRoutes.post('/usuario/deslogar', UsuarioController.deslogar);

userRoutes.get('/usuario/perfil', authMiddleware, UsuarioController.carregarPerfil);
userRoutes.post('/usuario/perfil', authMiddleware, UsuarioController.atualizarPerfil);

export {
    userRoutes
}