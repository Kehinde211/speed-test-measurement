import { Router }  from "express"
import { SignUpController, LoginController, LogOutController } from "../controllers/auth.controller"
const authRouter = Router()

authRouter.post("/signup", SignUpController)
authRouter.post("/login", LoginController)
authRouter.post("/logout", LogOutController)

export default authRouter;