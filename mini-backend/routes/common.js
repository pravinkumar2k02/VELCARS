const express = require("express");

const router = express.Router();

const commonRouteController = require('../controllers/common');

router.get("/fetch-all-cars", commonRouteController.fetchAllCars);

router.get("/fetch-specific-car/:id", commonRouteController.fetchSpecificCar);

router.get("/fetch-review", commonRouteController.fetchReviews);

module.exports = router;
