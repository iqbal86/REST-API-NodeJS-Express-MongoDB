// Create a model to interact with database in easy way.

const mongoose = require("mongoose");

// passing in javascript object which have keys for all the different properties of our subscriber.
const subscriberSchema = new mongoose.Schema({
	name: {
		type: String, // define different properties of our schema.
		required: true,
	},
	subscribedToChannel: {
		type: String, // define different properties of our schema.
		required: true,
	},
	subscribeDate: {
		type: Date, // define different properties of our schema.
		required: true,
		default: Date.now,
	},
});

module.exports = mongoose.model("Subscriber", subscriberSchema); // model function takes two parameters. the first is the name of the model in our database. and the next is the schema that corresponds to that model.
// when we export this and import it in different file, the model allows us to interact directly with the database using this Schema.
