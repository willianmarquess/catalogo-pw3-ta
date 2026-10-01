import { Router } from "express";
import { authMiddleware } from "../middlewares/AuthMiddleware";
import { asyncExecutor } from "../utils/AsyncExecutor";
import { ItemController } from "../controllers/ItemController";

const itemRoutes = Router();

itemRoutes.get('/item/cadastrar', authMiddleware(['USUARIO', 'ADMIN']), asyncExecutor(ItemController.carregarCadastrar));