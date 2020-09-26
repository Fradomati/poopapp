const express = require("express");
const router = express.Router();
const Content = require("../models/Content_Model");
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






module.exports = router;