const User = require("../models/user");
const Review = require("../models/review");

exports.fetchWishlist = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .populate("wishlist.productId")
    .then((user) => res.status(200).send(user.wishlist))
    .catch((err) => res.status(500).send(err));
};

exports.addToWishlist = (req, res) => {
  const { id, productId } = req.body;
  User.updateOne({ _id: id }, { $push: { wishlist: { productId: productId } } })
    .then(() => res.status(200).send("Added to Wishlist"))
    .catch((err) => res.status(500).send(err));
};

exports.removeFromWishlist = (req, res) => {
  const { id, productId, _id } = req.body;
  console.log(id, productId, _id);
  if (productId) {
    User.updateOne(
      { _id: id },
      { $pull: { wishlist: { productId: productId } } }
    )
      .then(() => res.status(200).send("Removed from Wishlist"))
      .catch((err) => res.status(500).send(err));
  } else {
    User.updateOne({ _id: id }, { $pull: { wishlist: { _id: _id } } })
      .then(() => res.status(200).send("Removed from Wishlist"))
      .catch((err) => res.status(500).send(err));
  }
};

exports.addReview = (req, res) => {
  // const {userId, username, review, rating} = req.body;
  // console.log(userId, username, review, rating);
  const newReview = new Review({
    ...req.body,
  });
  newReview
    .save()
    .then(() => res.status(200).send("Thanks for your Review"))
    .catch((err) => res.status(500).send(err));
};

exports.deleteAccount = (req, res) => {
  const {userId} = req.body;
  User.findByIdAndDelete(userId)
  .then(() => res.status(200).send("Account has been deleted successfully"))
  .catch((err) => res.status(500).send(err));
}
