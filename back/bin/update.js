require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User_Model")



mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((x) => {
        console.log(
            `Connected to Mongo! Database name: "${x.connections[0].name}"`
        );
    })
    .catch((err) => {
        console.error("Error connecting to mongo", err);
    });


const update = () => {
    const up = (resolve, reject) => {

        User.update({}, { $set: { "age": 0 } }, false, true).then((result) => {
            resolve()
        }).catch(err => {
            reject(err)
        })
    }
    up()
}

update()