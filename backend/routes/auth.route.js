import express from "express";
import { signup, logout, login} from "../controllers/auth.controller.js";

const router = express.Router();

router.post('/', signup);
router.get('/:id', login);
router.delete('/:id', logout); 

export default router;