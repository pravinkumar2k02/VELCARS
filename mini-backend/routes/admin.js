const express = require("express");

const router = express.Router();

const adminRouteController = require("../controllers/admin");

//Car

router.post("/add-car", adminRouteController.addCar);

router.post("/edit-car/:id", adminRouteController.editCar);

router.delete("/delete-car/:id", adminRouteController.deleteCar);

//Buyer Records

router.post("/add-buyer-record", adminRouteController.addBuyerRecord);

router.get("/fetch-buyer-records", adminRouteController.fetchBuyerRecords);

router.get("/fetch-buyer-record/:id", adminRouteController.fetchSpecificBuyerRecord);

router.post("/edit-buyer-record/:id", adminRouteController.editBuyerRecord);

router.delete("/delete-buyer-record/:id", adminRouteController.deleteBuyerRecord);

//Seller Records

router.post("/add-seller-record", adminRouteController.addSellerRecord);

router.get("/fetch-seller-records", adminRouteController.fetchSellerRecords);

router.get("/fetch-seller-record/:id", adminRouteController.fetchSpecificSellerRecord);

router.post("/edit-seller-record/:id", adminRouteController.editSellerRecord);

router.delete("/delete-seller-record/:id", adminRouteController.deleteSellerRecord);

//Car Model

router.post("/add-car-model", adminRouteController.addCarModel);

router.get("/fetch-car-models", adminRouteController.fetchCarModels);

module.exports = router;
