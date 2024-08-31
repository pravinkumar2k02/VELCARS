const Product = require("../models/product");
const Review = require("../models/review");
exports.fetchAllCars = (req, res) => {
  Product.find()
    .sort({ postedDate: -1 })
    .then((product) => res.status(200).send(product))
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
};

exports.fetchSpecificCar = (req, res) => {
  const { id } = req.params;
  Product.findById(id)
    .then((product) => res.status(200).send(product))
    .catch((err) => res.status(500).send(err));
};

exports.fetchReviews = (req, res) => {
  Review.find()
    .sort({ rating: -1, reviewedDate: -1 })
    .limit(3)
    .then((reviews) => res.status(200).send(reviews))
    .catch((err) => res.status(500).send(err));
};
