const moongose = require("mongoose");
const Schema = moongose.Schema;

const ContentModel = new Schema(
    {
        time: String,
        category: String,
        url: String,
        title: [{ type: Number }],
        userShared: { type: Number, default: 0 },
        days: [{ type: Number }],
        hours: [{ type: Number }],
        refContent: [{ type: Schema.Types.ObjectId, ref: "User" }],
        storeContent: { type: Array, default: [] },
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
