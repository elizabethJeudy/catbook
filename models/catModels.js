const mongoose = require("mongoose");

// grabs user input data from mongo database
const catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	favoriteFood: String,
	funFact: String,
	image: String,
});

module.exports = mongoose.model("Cat", catSchema);
