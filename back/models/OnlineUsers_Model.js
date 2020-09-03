const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OnlineUsers = new Schema(
    {
        TotalUserOnline: [{ type: Schema.Types.ObjectId, ref: "User" }],
    },
    {
        timestamps: true,
    }
);
const Online = mongoose.model("Content", OnlineUsers);
module.exports = Online;
