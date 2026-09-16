import Router from "express"
import { SignUpController, LoginController, LogOutController } from "../controllers/auth.controller"
export const router = Router()

router.post("/signup", SignUpController)
router.post("/login", LoginController)
router.post("/logout", LogOutController)