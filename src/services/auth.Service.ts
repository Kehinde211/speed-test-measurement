import  prisma  from "../lib/prisma";
import bcrypt from "bcryptjs"
import { AppError } from "../utils/AppError";

export class AuthService {
    static async findUserByEmail(email: string) {
        return await prisma.user.findUnique({
            where: { email }
        })
    }

    static async registerUser(username: string, email: string, password: string) {
        const existingUser = await this.findUserByEmail(email)

        if (existingUser) {
            throw new AppError("User with this email already exists", 409);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            }
        })
        console.log('Created User in DB:', newUser)
        return newUser;
    }
}