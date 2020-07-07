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


        // req.logIn(newUser, (err) => {
        //     res.json(
        //         _.pick(req.user, ["username", "_id", "createdAt", "updatedAt"])
        //     );
        // });
    } else {
        res.json({ status: "User Exist, try again!" });
    }
});

module.exports = router;