const express = require("express");
const passport = require("passport");
const _ = require("lodash");
const router = express.Router();
const User = require("../models/User_Model");
const { hashPassword } = require("../lib/hashing")


router.post("/signup", async (req, res) => {
    const { username, password, email } = req.body;

    // Check if user is created

    const existUser = await UserModel.findOne({ username });

    if (!existUser) {
        const newUser = await UserModel.create({
            username,
            password: hashPassword(password),
            email,
        });


        req.logIn(newUser, (err) => {
            res.json(
                _.pick(req.user, ["username", "_id", "createdAt", "updatedAt"])
            );
        });
    } else {
        res.json({ status: "User Exist, try again!" });
    }
});