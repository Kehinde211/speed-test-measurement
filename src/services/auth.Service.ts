import { prisma } from "config/prisma"
import bcrypt from "bcryptjs"

export class AuthService {
    static async findUserByEmail(email: string) {
        return await prisma.user.findUnique({
            where: { email }
        })
    }

    static async registerUser(username: string, email: string, password: string) {
        const existingUser = await this.findUserByEmail(email)

        if (existingUser) {
            throw new Error("User with this email already exists")
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                username: username,
                email: email,
                password: hashedPassword,
            }
        })
        return newUser;
    }
}