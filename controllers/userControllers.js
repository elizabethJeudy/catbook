const passport = require("passport");
const User = require("../models/userModel");

const loginPage = (req, res) => {
	res.render("login");
};

const registerPage = (req, res) => {
	res.render("register");
};

// login auth
const loginUser = passport.authenticate("local", {
	successRedirect: "/",
	failureRedirect: "/login",
	failureFlash: false,
});

// register auth
const registerUser = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = new User({ username });
		await User.register(user, password);
		passport.authenticate("local")(req, res, function () {
			res.redirect("/");
		});
	} catch (error) {
		console.log(error);
		res.redirect("/register");
	}
};

// logout auth
const logoutUser = (req, res) => {
	res.logout(function (error) {
		if (error) {
			return next(error);
		}
		res.redirect("/");
	});
};

module.export = {
	loginUser,
	loginPage,
	registerPage,
	registerUser,
	logoutUser,
};
