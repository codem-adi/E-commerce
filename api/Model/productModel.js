const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
     productName: { type: String, required: true },
     productDec: { type: String, required: true },
     image: { type: String, required: true },
     price: { type: Number, required: true },
     isAvailable: { type: Boolean, default: true }
}, { timestamps: true }
);


module.exports = mongoose.model("Products", productSchema);

