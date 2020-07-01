const moongose = require("mongoose");
const Schema = moongose.Schema;

const UserModel = new Schema(
    {
        username: String,
        password: String,
        email: String,
        totalTimes: [{ type: Number }],
        lastTime: { type: Number, default: 0 },
        days: [{ type: Number }],
        hours: [{ type: Number }],
        refContent: [{ type: Schema.Types.ObjectId, ref: "Content" }],
        storeContent: { type: Array, default: [] },
        likesContent: {
            1: [{ type: Schema.Types.ObjectId, ref: "Content" }],
            2: [{ type: Schema.Types.ObjectId, ref: "Content" }],
            3: [{ type: Schema.Types.ObjectId, ref: "Content" }],
            4: [{ type: Schema.Types.ObjectId, ref: "Content" }]
        }
    },
    {
        timestamps: true,
    }
);
const User = mongoose.model("User", UserModel);
module.exports = User;
