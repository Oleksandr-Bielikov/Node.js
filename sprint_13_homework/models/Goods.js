const mongoose = require('mongoose');

const goodsSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        minLength: 3,
        maxLength: 150,
        required: true
    },
    url: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    category: {
        type: String,
        enum: {
            values: ["phones", "laptops"]
        },
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    image: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    stock: {
        type: Number,
        min: 0,
        default: 0
    },
    show: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Goods", goodsSchema);