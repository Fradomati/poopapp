const express = require("express");
const router = express.Router();
const Content = require("../models/Content_Model");
const User = require("../models/User_Model")
const passport = require("passport");
const _ = require("lodash");


router.post("/addContent", async (req, res) => {

    const { time, category, url, title, id } = req.body

    const newContent = await Content.create({
        time,
        category,
        url,
        title,
        userShared: id
    })

    console.log("Nuevo contenido", newContent)

    res.json({ status: 200, message: `¡Genial! Has agregado a ${category}: "${title}" `, title: title, category: category })


})


router.get("/findAll", async (req, res) => {
    await Content.find({}, (err, result) => {
        if (err) {
            res.json({ status: 500, message: "No hay contenido" })
        } else {
            res.json(result)
        }
    })

})


router.post("/findCategory", async (req, res) => {
    const { category, time } = req.body

    if (time === "-") {
        await Content.find({
            category: category
        }, (err, result) => {
            if (err) {
                res.json({ status: 500, message: "No hay contenido" })
            } else {
                res.json(result)
            }
        })
    } else if (category === "-") {
        await Content.find({
            time: time
        }, (err, result) => {
            if (err) {
                res.json({ status: 500, message: "No hay contenido" })
            } else {
                res.json(result)
            }
        })
    } else {
        await Content.find({
            category: category,
            time: time
        }, (err, result) => {
            if (err) {
                res.json({ status: 500, message: "No hay contenido" })
            } else {
                res.json(result)
            }
        })
    }
})


router.post("/likeButton", async (req, res) => {
    const { like_1, id_cnt, id_user } = req.body

    console.log("LIKE------", like_1, id_cnt, id_user)

    if (like_1 === true) {

        // Prevent double click
        const existElement = await Content.findByIdAndUpdate(
            { _id: id_cnt }
        )
        if (existElement.like_1.includes(id_user)) {
            console.log("SOoooooo")
            res.json({ status: 500, message: "¡Más despacio!" })
        } else {

            await Content.findByIdAndUpdate(
                { _id: id_cnt },
                {
                    $push: {
                        like_1: id_user
                    }
                }
            )
            await User.findByIdAndUpdate(
                { _id: id_user },
                {
                    $push: {
                        likesContent: id_cnt
                    }
                }
            )
        }
        const updateCnt = await Content.findById(id_cnt)
        const updateUser = await User.findById(id_user)
        res.json({ updateCnt, updateUser })
    } else {
        await Content.findByIdAndUpdate(
            { _id: id_cnt },
            {
                $pull: {
                    like_1: id_user
                }
            }
        )
        await User.findByIdAndUpdate(
            { _id: id_user },
            {
                $pull: {
                    likesContent: id_cnt
                }
            }
        )
        const updateCnt = await Content.findById(id_cnt)
        const updateUser = await User.findById(id_user)
        res.json({ updateCnt, updateUser })
    }
})


module.exports = router;