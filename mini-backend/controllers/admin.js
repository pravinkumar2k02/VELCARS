const Product = require("../models/product");
const BuyerRecord = require("../models/buyerRecord");
const SellerRecord = require("../models/SellerRecord");
const CarModel = require("../models/carModel");

//Cars
exports.addCar = async(req, res) => {
  const { name } = req.body;
  console.log(name);
  const found = await CarModel.find({ name: name })
    .then((data) => {
      return data;
    })
    .catch((err) => res.status(500).send(err));
  if(found.length === 0){
    CarModel.updateOne({ category: "model" }, { $push: {name} })
    .then(() => console.log("Car Model Added"))
    .catch(err => console.log(err));
  }
  console.log(found);
  const newProduct = new Product(req.body);
  newProduct
    .save()
    .then(() => res.status(200).send("Product added"))
    .catch((err) => res.status(500).send(err));
};

exports.editCar = (req, res) => {
  const { id } = req.params;
  Product.findByIdAndUpdate(id, req.body)
    .then(() => res.status(200).send("Product edited"))
    .catch((err) => res.status(500).send(err));
};

exports.deleteCar = (req, res) => {
  const { id } = req.params;
  Product.findByIdAndDelete(id)
    .then(() => res.status(200).send("Product Deleted"))
    .catch((err) => res.status(500).send(err));
};

//Buyer Record
exports.addBuyerRecord = (req, res) => {
  const newBuyer = new BuyerRecord(req.body);
  newBuyer
    .save()
    .then((record) => {
      Product.findByIdAndUpdate(req.body.productId, {
        sold: true,
        soldTo: record._id,
      })
        .then(() =>
          res
            .status(200)
            .send("New Buyer Record Added and Product marked as sold")
        )
        .catch((err) => res.status(500).send(err));
    })
    .catch((err) => res.status(500).send(err));
};

exports.fetchBuyerRecords = (req, res) => {
  BuyerRecord.find()
    .sort({ purchasedDate: -1 })
    .populate("productId")
    .then((buyerRecord) => res.status(200).send(buyerRecord))
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
};

exports.fetchSpecificBuyerRecord = (req, res) => {
  const { id } = req.params;
  console.log(id);
  BuyerRecord.findById(id)
    .then((record) => res.status(200).send(record))
    .catch((err) => res.status(500).send(err));
};

exports.editBuyerRecord = (req, res) => {
  const { id } = req.params;
  BuyerRecord.findByIdAndUpdate(id, req.body)
    .then((record) => res.status(200).send(record))
    .catch((err) => res.send(500).send(err));
};

exports.deleteBuyerRecord = (req, res) => {
  const { id } = req.params;
  BuyerRecord.findByIdAndDelete(id)
    .then((record) => {
      Product.findByIdAndUpdate(record.productId, { sold: false, soldTo: null })
        .then(() =>
          res
            .status(200)
            .send("Buyer Record Deleted and Product marked as unsold")
        )
        .catch((err) => res.status(500).send(err));
    })
    .catch((err) => res.send(500).send(err));
};

//Seller Record
exports.addSellerRecord = (req, res) => {
  const newSeller = new SellerRecord(req.body);
  newSeller
    .save()
    .then(() => res.status(200).send("New Seller record added"))
    .catch((err) => res.status(500).send(err));
};

exports.fetchSellerRecords = (req, res) => {
  SellerRecord.find()
    .sort({ purchasedDate: -1 })
    .populate("productId")
    .then((sellerRecord) => res.status(200).send(sellerRecord))
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
};

exports.fetchSpecificSellerRecord = (req, res) => {
  const { id } = req.params;
  SellerRecord.findById(id)
    .then((record) => res.status(200).send(record))
    .catch((err) => res.status(500).send(err));
};

exports.editSellerRecord = (req, res) => {
  const { id } = req.params;
  SellerRecord.findByIdAndUpdate(id, req.body)
    .then((record) => res.status(200).send(record))
    .catch((err) => res.send(500).send(err));
};

exports.deleteSellerRecord = (req, res) => {
  const { id } = req.params;
  SellerRecord.findByIdAndDelete(id)
    .then(() => res.status(200).send("Deleted Successfully"))
    .catch((err) => res.send(500).send(err));
};

//Car Model
exports.addCarModel = (req, res) => {
  CarModel.updateOne({ category: "model" }, { $push: { ...req.body } })
    .then(() => res.status(200).send("New Car Model record added"))
    .catch((err) => res.status(500).send(err));
};

exports.fetchCarModels = (req, res) => {
  CarModel.findOne()
    .then((carModel) => res.status(200).send(carModel.name))
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
};
