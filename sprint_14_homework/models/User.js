import mongoose from "mongoose";

const userShema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 15,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        trim: true
    },
}, {
    timestamps: true
});

export default mongoose.model("User", userShema);