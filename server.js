require("dotenv").config(); // load environment variables from env.

const express = require("express"); // bring in express library from package.json.
const app = express(); // express function exported by the express module. app variable will be used to configure our server.
const mongoose = require("mongoose"); // bring in mongoose library from package.json.

// connect to the database throgh env(environment) variable.
mongoose.connect(process.env.DATABASE_URL, {
	useUnifiedTopology: true, // mind the deprecation warnings.
	useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json()); // setup our server to accept json as body inside POST, GET ...etc element.

const subscribersRouter = require("./routes/subscribers"); // setup our routes.
app.use("/subscribers", subscribersRouter); // tell the app to use subscribersRouter in its defined path.

app.listen(3000, () => console.log("Server Started"));
