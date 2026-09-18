import { Request, Response, NextFunction } from "express"
import { signUpSchema } from "../schemas/signUpSchema"
import { AuthService } from "../services/auth.Service"
import passport from "passport";

export const SignUpController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {username, email, password } = req.body;
        const validationResult = signUpSchema.safeParse(req.body);

        if (!validationResult.success) {
            return res.status(400).json({
                message: "Signup validation failed",
                success: false,
            })
        }

        const newUser = await AuthService.registerUser(username, email, password)

        // if (!newUser) {
        //     return res.status(400).json({
        //         message: "New user failed to be created",
        //         success: false,
        //     })
        // }
        // res.status(201).json({
        //     message: "New user successfully created",
        //     data: newUser,
        //     success: true,
        // })

        req.login(newUser, (err) => {
            if (err) return next(err);
            return res.status(201).json({
                message: 'User registered and logged in successfully',
                user: { username: newUser.username },
            });
        });
    } catch (err) {
        next(err)
    }
}

export const LoginController = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', (err: any, user: any, info: any) => {
        if (err) {
            return next(err)
        } if (!user) {
            return res.status(400).json({
                message: info.message || "Login failed",
                success: false,
            })
        } else {
            req.login(user, (err) => {
                if (err) return next(err);
                return res.status(200).json({
                    message: 'Login successful',
                    user: { id: user.id, username: user.username },
                });
            });
        }
    })(res, req, next)
}

export const LogOutController = (req: Request, res: Response, next: NextFunction) => {
    req.logout((err) => {
        if (err) return next(err);
        (req as Request & {
            session: { destroy: (callback: (err?: any) => void) => void }
        }).session.destroy(() => {
            res.clearCookie('connect.sid');
            return res.status(200).json({ message: "Logged out successfully" })
        })
    })
}