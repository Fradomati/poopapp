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

/*

Dos modelos, User y Content.

Básico:

- Si un usuario le da a like_1, mandamos un "true" de like_1, el ID del contenido y el ID del usuario. 
- Con el "True" confirmamos qué opción a marcado.
- Buscamos el contenido marcado y le agregamos el "ID de Usuario" a like_1 (modelo content)
- Por otro lado, buscamos al usuario y le agregamos el "ID de Content" a su like_1 (modelo user)
- Solo puede haber seleccionado una opción.

Caso 1 - Desmarcar:

- Solo puede haber 1 like/dislike por artículo, por lo que si vuelve a pulsar en la misma opción
el resultado sería "desmarcar" la opción por lo que se debe borrar el ID tanto del Modelo User como del Modelo Content.


IDEA: ¿Es necesario que haya dislike?

*/
router.post("/likeButton", async (req, res) => {
    const { like_1, id_cnt, id_user } = req.body

    console.log("LIKE------", like_1, id_cnt, id_user)

    if (like_1 === true) {

        console.log("AHORA CONTENT")
        await Content.findByIdAndUpdate(
            { _id: id_cnt },
            {
                $push: {
                    like_1: id_user
                }
            }
        )
        console.log("AHORA USER")
        await User.findByIdAndUpdate(
            { _id: id_user },
            {
                $push: {
                    likesContent: id_cnt
                }
            }
        )
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