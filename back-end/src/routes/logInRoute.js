import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getDbConnection } from "../db";

export const logInRoute = {
    path: "/api/auth/log-in",
    method: "post",
    handler: async (req, res) => {
        const { email, password } = req.body;
        const db = getDbConnection("react-auth-db");
        const user = await db.collection("users").findOne({ email });
        if (!user) {
            return res.sendStatus(401);
        }

        // One way of approaches
        // const passwordMatch = await bcrypt.compare(password, user.passwordHash);
        // if (!passwordMatch) {
        //     return res.sendStatus(401);
        // }
        // const token = jwt.sign(
        //     { id: user._id, email: user.email, info: user.info, isVerified: user.isVerified },
        //     process.env.JWT_SECRET,
        //     { expiresIn: "1d" }
        // );
        // res.status(200).send({ token });

        // another way of approaches

        const {_id: id, isVerified, passwordHash, info} = user;
        const isCorrect = await bcrypt.compare(password, user.passwordHash);
        if (isCorrect) {
            jwt.sign(
                { id, email, info, isVerified },
                process.env.JWT_SECRET,
                { expiresIn: "1d" },
                (err, token) => {
                    if (err) {
                        return res.sendStatus(500);
                    }
                    res.status(200).json({ token });    
                }
            );
        } else {
            return res.sendStatus(401);
        }
    },
};