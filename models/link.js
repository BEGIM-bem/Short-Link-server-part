const { Schema, model, Types } = require("mongoose")
const LinkSchema = new Schema({
    ownerId: {
        type: Types.ObjectId,
        ref: "user",
        required: true,

    },
    redirectId: {
        type: String,
        required: true,
    },
    clickcount: {
        type: Number,
        default: 0,
    },
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
},
    { timestamps: true },
)
exports.LinkModel = model("Link", LinkSchema)