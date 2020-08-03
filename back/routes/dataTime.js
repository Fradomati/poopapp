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
    res.json({ status: 200, message: `Enviamos ${seconds} segundos y los guardamos` })
})


module.exports = router