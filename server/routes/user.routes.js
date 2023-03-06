import { Router } from "express";
import { addUser ,getUsers } from "../controllers/user.controller.js";

const router = Router();


router.post('/nuevo_usuario',addUser);
router.get('/obtener_usuarios',getUsers)


export default router;