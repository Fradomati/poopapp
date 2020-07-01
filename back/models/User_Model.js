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
        refContent: { type: Number, default: 0 },
        storeContent: { type: Array, default: [] },
    },
    {
        timestamps: true,
    }
);
const User = mongoose.model("User", UserModel);
module.exports = User;
