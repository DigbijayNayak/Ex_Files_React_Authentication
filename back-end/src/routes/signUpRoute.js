import { getDbConnection } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUpRoute = {
    path: "/api/auth/sign-up",
    method: "post",
    handler: async (req, res) => {
        const { email, password } = req.body;
        const db = getDbConnection("react-auth-db");
        const user = await db.collection("users").findOne({ email });
        if (user) {
            // return res.status(400).send('User already exists');
            return res.sendStatus(409);
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const startingInfo = {
            hairColor: "",
            favoriteFood: "",
            bio: "",
        };

        const result = await db.collection("users").insertOne({
            email,
            passwordHash,
            info: startingInfo,
            isVerified: false,
        });

        const { insertedId } = result;
        console.log(process.env.JWT_SECRET);
        jwt.sign(
            { id: insertedId, email, info: startingInfo, isVerified: false },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            },
            (err, token) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send(err);
                }
                res.status(200).send({ token });
            }
        );
    },
};
