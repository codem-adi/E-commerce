const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
     userName: { type: String, required: true },
     email: { type: String, required: true },
     phone: { type: Number, required: true },
     address: { type: String, required: true },
     pincode: { type: Number, required: true },
     cartItems: { type: Array, default: [] }
}, { timestamps: true }
);


module.exports = mongoose.model("User", userSchema);
