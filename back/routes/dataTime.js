const express = require("express");
const router = express.Router();
const User = require("../models/User_Model");
const _ = require("lodash");

router.post("/sendTime", async (req, res) => {
    const { id, seconds, day, hour, lastTime } = req.body

    await User.findByIdAndUpdate(
        { _id: id },
        {
            $push: {
                totalTimes: seconds,
                days: day,
                hours: hour
            }
        },
    )

    const update = await User.findById(id)

    res.json(_.pick(update, [
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
    ]))
})


module.exports = router