import { Router } from "express";
import { addUser ,getUsers } from "../controllers/user.controller.js";

const router = Router();


router.post('/nuevo_usuario',addUser);
router.get('/obtener_usuarios',getUsers);
router.get('/',(req,res)=>{res.render("home")});


export default router;