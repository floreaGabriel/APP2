import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { getUserDashboard } from "../controllers/user.controller.js";

const router = express.Router();


//router.get("/dashboard", protectRoute , getUserDashboard);

export default router;