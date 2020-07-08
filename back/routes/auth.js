const express = require("express");
const passport = require("passport");
const _ = require("lodash");
const router = express.Router();
const User = require("../models/User_Model");
const { hashPassword } = require("../lib/hashing")




router.post("/signup", async (req, res) => {
    const { email, username, password } = req.body;

    // Check if user is created

    const existUser = await User.findOne({ email });

    if (!existUser) {
        const newUser = await User.create({
            email,
            username,
            password: hashPassword(password),
        });
        console.log("Register", username, "done")
        res.json({ status: `${username} register` })
        // req.logIn(newUser, (err) => {
        //     res.json(
        //         _.pick(req.user, ["username", "_id", "createdAt", "updatedAt"])
        //     );
        // });
    } else {
        res.json({ status: "User Exist, try again!" });
    }
});


router.post("/login", (req, res) => {
    passport.authenticate("local", (err, user, failureDetails) => {
        if (err) {
            console.log("err:", err);
            return res.json({ status: "Error en la Autentificación" });
        }
        console.log(user);
        if (!user) {
            return res.json({ status: "No existe el usuario" });
        }
        req.login(user, (err) => {
            if (err) {
                return res.status(500).json({ status: "Sesión mal guardada" });
            }
            return res.json(req.user);
        });
    })(req, res);
});
module.exports = router;