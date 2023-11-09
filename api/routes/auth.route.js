import express from "express"
import { login, register, logout } from "../controllers/auth.controller.js"
import {verifyToken} from "../functions/jwt.js"

const router = express.Router()

router.post("/login", login)
router.post("/register", verifyToken, register)
router.post("/logout",logout)

export default router