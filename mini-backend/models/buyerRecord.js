const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const buyerRecordSchema = new Schema({
  carName: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  purchasedDate: {
    type: Date,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  customerAddress: {
    type: String,
    required: true,
  },
  customerPhone: {
    type: String,
    required: true,
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  
});

module.exports = mongoose.model("BuyerRecord", buyerRecordSchema);