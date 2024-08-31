const express = require('express');

const router = express.Router();

const userRouteController = require("../controllers/user");

router.get("/fetch-wishlist/:id", userRouteController.fetchWishlist);

router.post("/add-to-wishlist", userRouteController.addToWishlist);

router.post("/remove-from-wishlist", userRouteController.removeFromWishlist);

router.post("/add-review", userRouteController.addReview);

router.post("/delete-account", userRouteController.deleteAccount);

module.exports = router;
