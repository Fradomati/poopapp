const express = require("express");
const router = express.Router();
const OnlineUser = require("../models/OnlineUsers_Model");
const _ = require("lodash");

router.post("/on_user", async (req, res) => {
    const { id } = req.body;

    console.log("id", id)

    await OnlineUser.findOneAndUpdate(
        {
            $push: {
                TotalUserOnline: id,
            }
        }
    )

    const update = OnlineUser.findOne()
    res.json(_.pick(update, "TotalUserOnline"))
})

router.post("/off_user", async (req, res) => {
    const { id } = req.body;

    await OnlineUser.findOneAndUpdate(
        {
            $pull: {
                TotalUserOnline: id,
            }
        }
    )

    const update = OnlineUser.findOne()
    res.json(_.pick(update, "TotalUserOnline"))
})


module.exports = router