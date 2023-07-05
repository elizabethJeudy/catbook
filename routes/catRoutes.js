const express = require("express");
const catController = require("../controllers/catController");
const router = express.Router();

// routes to homepage, displaying inputs
router.route("/").get(catController.getAllCats);

// routes to upload page
router
	.route("/upload")
	.get(catController.uploadPage)
	.post(catController.upload.single("image"), catController.createCat);

// routes to edit page
router
	.route("/edit/:id")
	.get(catController.editPage)
	.post(catController.updateCat);

router.route("/delete/:id").post(catController.deleteCat);

module.exports = router;
