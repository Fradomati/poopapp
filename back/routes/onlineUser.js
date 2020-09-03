const express = require("express");
const router = express.Router();
const OnlineUser = require("../models/OnlineUsers_Model");
const _ = require("lodash");

router.post("/on_user", async (req, res) => {
    const { id } = req.body;

    console.log("------- ON USER -------")

    const exist = await OnlineUser.findOne()
    if (exist === null) {
        OnlineUser.create()
    }

    console.log(exist)

    await OnlineUser.findOneAndUpdate(
        {
            $push: {
                TotalUserOnline: id,
            }
        }
    )

    const update = await OnlineUser.findOne()
    res.json(_.pick(update, "TotalUserOnline"))
})

router.post("/off_user", async (req, res) => {
    const { id } = req.body;

    console.log("------- OFF USER -------")

    await OnlineUser.findOneAndUpdate(
        {
            $pull: {
                TotalUserOnline: id,
            }
        }
    )

    const update = await OnlineUser.findOne()

    console.log("off:", update)

    res.json(_.pick(update, "TotalUserOnline"))
})

router.get("/ask_user", async (req, res) => {
    const data = await OnlineUser.findOne()

    data ? res.json(_.pick(data, "TotalUserOnline")) : res.json(null)
})


module.exports = router