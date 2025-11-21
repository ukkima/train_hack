import express from "express";
import authCtrl from "../controllers/authCtrl.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/auth/register", authCtrl.register);
router.post("/auth/login", authCtrl.login);
router.get("/auth/refreshToken", authCtrl.refreshToken);
router.patch("/auth/update", auth, authCtrl.update);
router.get("/auth/logout", authCtrl.logout);
router.delete("/auth/delete", auth, authCtrl.delete);

export default router;
