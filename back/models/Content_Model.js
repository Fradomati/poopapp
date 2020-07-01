const moongose = require("mongoose");
const Schema = moongose.Schema;

const ContentModel = new Schema(
    {
        time: String,
        category: String,
        url: String,
        title: String,
        userShared: { type: Schema.Types.ObjectId, ref: "User" },
        date: { type: Date, default: Date.now },
        like_1: [{ type: Schema.Types.ObjectId, ref: "User" }],
        like_2: [{ type: Schema.Types.ObjectId, ref: "User" }],
        like_3: [{ type: Schema.Types.ObjectId, ref: "User" }],
        like_4: [{ type: Schema.Types.ObjectId, ref: "User" }]
    },
    {
        timestamps: true,
    }
);
const Content = mongoose.model("Content", Content);
module.exports = Content;
