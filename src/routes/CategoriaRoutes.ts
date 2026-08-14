import { Router } from "express";
import { authMiddleware } from "../middlewares/AuthMiddleware";
import { CategoriaController } from "../controllers/CategoriaController";

const categoriaRoutes = Router();

categoriaRoutes.get('/categoria/cadastrar', authMiddleware(['ADMIN']), CategoriaController.carregarCadastrar);
categoriaRoutes.post('/categoria/cadastrar', authMiddleware(['ADMIN']), CategoriaController.cadastrar);

export {
    categoriaRoutes
}