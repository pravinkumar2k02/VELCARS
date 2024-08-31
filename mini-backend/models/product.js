const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  imageDetails: [
      {
        fileName: {
          type: String,
          required: true
        },
        imageUrl: {
          type: String,
          required: true
        }
      }
  ],
  fuel: {
    type: String,
    required: true,
  },
  kmRunned: {
    type: Number,
    required: true,
  },
  transmission: {
    type: Array,
    required: true,
  },
  owners: {
    type: Number,
  },
  millage: {
    type: Number,
    required: true,
  },
  insured: {
    type: String,
    required: true,
  },
  postedDate: {
    type: Date,
    required: true,
  },
  sold: {
    type: Boolean,
  },
  soldTo: {
    type: Schema.Types.ObjectId,
    ref: "BuyerRecord"
  }
});

module.exports = mongoose.model("Product", productSchema);
