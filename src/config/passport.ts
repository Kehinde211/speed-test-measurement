import bcrypt from "bcryptjs"
import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

passport.use(new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
        try {
            const user = await prisma.user.findUnique({ where: { email } })

            if (!user) {
                return done(null, false, { message: "Incorrect email or password" })
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return done(null, false, { message: "Incorrect email or password" })
            }
            done(null, user)
        } catch (err) {
            done(err, false)
        }
    }
))

passport.serializeUser((user: any, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id: number, done) => {
    try {
        const user = await prisma.user.findUnique({ where: { id} })
        done(null, user)
    } catch (err) {
        done(err, null)
    }
}) 
