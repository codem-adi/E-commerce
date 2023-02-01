const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
     userID: { type: String, required: true },
     cartItems: { type: Object, default: {} },
     completed:{ type : Boolean , default : false}
     // status: { type: String, required: true }
}
     , { timestamps: true }
);


module.exports = mongoose.model("orders", orderSchema);
