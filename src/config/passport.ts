import bcrypt from "bcryptjs"
import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"
import prisma from "../lib/prisma";

passport.use(new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
        try {
            const user = await prisma.user.findUnique({ where: { email } })

            if (!user) {
                return done(null, false, { message: "Incorrect email" })
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return done(null, false, { message: "Incorrect password" })
            }
            done(null, user)
        } catch (err) {
            done(err, false)
        }
    }
))

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number | string, done) => {
  try {
    const user = await prisma.user.findUnique({ 
      where: { id: Number(id) } // 
    });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
