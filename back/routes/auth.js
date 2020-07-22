const express = require("express");
const router = express.Router();
const User = require("../models/User_Model");
const passport = require("passport");
const _ = require("lodash");
const { hashPassword } = require("../lib/hashing")
const { isLoggedIn } = require("../lib/loggedMidleware")
const { sendEmail } = require("../lib/sendEmails")





router.post("/login", (req, res) => {
    passport.authenticate("local", (err, user, failureDetails) => {
        console.log("LOCAL", user)
        if (err) {
            console.log("err:", err);
            return res.json({ status: 417, message: "El email o la contraseña son incorrectos" });
        }
        console.log("el usuario", user);
        if (!user) {
            return res.json({ status: 417, message: "El email o la contraseña son incorrectos" });
        }
        req.login(user, (err) => {
            if (err) {
                return res.status(500).json({ status: "Sesión mal guardada" });
            }
            return res.json(_.pick(req.user, [
                "_id",
                "username",
                "password",
                "email",
                "totalTimes",
                "lastTime",
                "days",
                "hours",
                "refContent",
                "storeContent",
                "likesContent"
            ]));
        });
    })(req, res)
});

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
        sendEmail(email)
        console.log("Register", username, "done")
        res.json({ status: 200, message: `${username} register` })
        // req.logIn(newUser, (err) => {
        //     res.json(
        //         _.pick(req.user, ["username", "_id", "createdAt", "updatedAt"])
        //     );
        // });
    } else {
        res.json({ status: 417, message: `Ya existe este usuario` });
    }
});


router.post("/logout", async (req, res) => {
    if (req.user) {
        console.log(req.user);
        req.logout();
        return res.json({ status: "Logout OK" });
    } else {
        res.status(401).json({ status: "You are not logged" });
    }
});

module.exports = router;