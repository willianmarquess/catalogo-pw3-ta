import { Router } from "express";
import { authMiddleware } from "../middlewares/AuthMiddleware";
import { CategoriaController } from "../controllers/CategoriaController";
import { asyncExecutor } from "../utils/AsyncExecutor";

const categoriaRoutes = Router();

categoriaRoutes.get('/categoria/cadastrar', authMiddleware(['ADMIN']), asyncExecutor(CategoriaController.carregarCadastrar));
categoriaRoutes.post('/categoria/cadastrar', authMiddleware(['ADMIN']), asyncExecutor(CategoriaController.cadastrar));
categoriaRoutes.get('/categoria/listar', authMiddleware(['ADMIN']), asyncExecutor(CategoriaController.carregarListar));
categoriaRoutes.post('/categoria/excluir/:id', authMiddleware(['ADMIN']), asyncExecutor(CategoriaController.excluir));
categoriaRoutes.get('/categoria/editar/:id', authMiddleware(['ADMIN']), asyncExecutor(CategoriaController.carregarEditar));
categoriaRoutes.post('/categoria/editar/:id', authMiddleware(['ADMIN']), asyncExecutor(CategoriaController.atualizar));

export {
    categoriaRoutes
}