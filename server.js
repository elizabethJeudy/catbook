require(`dotenv`).config();
const express = require(`express`);
const path = require("path");
const app = express();
const connectDB = require("./config/connectDB");
const passport = require("passport");
// for local auth
const localStrategy = require("passport-local").Strategy;
const User = require("./models/userModel");
// const catRoutes = require("./routes/catRoutes");
const mongoose = require("mongoose");
const { deserializeUser } = require("passport");
const PORT = process.env.PORT || 4000;

connectDB();

//.use connects middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(
	session({
		secret: "this is Catbook",
		resave: false,
		saveUninitialized: false,
	})
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authentication()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(deserializeUser());

// pass current user to all routes
app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	next();
});

// app.use("/", catRoutes);

mongoose.connection.once("open", () => {
	console.log("Connected to MongoDB");
	app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
