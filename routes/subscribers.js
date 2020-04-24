// Creating routes

const express = require("express");
const router = express.Router(); // Router function from express.
const Subscriber = require("../models/subscriber"); // Subscriber model from subscriber.js.

// Getting all
// router function to get all "/"
router.get("/", async (req, res) => {
	try {
		const subscribers = await Subscriber.find(); // Subscriber model.
		res.json(subscribers);
	} catch (err) {
		res.status(500).json({ message: err.message }); // 500 = is the actual database error but not the client.
	}
});

// Getting One
router.get("/:id", getSubscriber, (req, res) => {
	res.json(res.subscriber);
});

// Creating one
router.post("/", async (req, res) => {
	const subscriber = new Subscriber({
		name: req.body.name, //  requet the name property of the body. the body is whatever the user sends to us which is going to be json.
		subscribedToChannel: req.body.subscribedToChannel,
	});
	try {
		const newSubscriber = await subscriber.save(); // save to database and if successful put it into new variable.
		res.status(201).json(newSubscriber); // 201 = created successfully.
	} catch (err) {
		res.status(400).json({ message: err.message }); // 400 = error due to bad data from user end but not with the server.
	}
});

// Updating One
// patch updates only the information what the user has passed. put updates all information.
router.patch("/:id", getSubscriber, async (req, res) => {
	// request body with name property passed by user.
	if (req.body.name != null) {
		res.subscriber.name = req.body.name;
	}
	if (req.body.subscribedToChannel != null) {
		res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
	}
	try {
		const updatedSubscriber = await res.subscriber.save(); // set to a new variable if it is saved in database.
		res.json(updatedSubscriber);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Deleting One
router.delete("/:id", getSubscriber, async (req, res) => {
	try {
		await res.subscriber.remove();
		res.json({ message: "Deleted Subscirber" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// middleware function.
async function getSubscriber(req, res, next) {
	let subscriber;
	try {
		// get user based on id that is passed in the url.
		subscriber = await Subscriber.findById(req.params.id); // params is correlating to the variable that is passed inside the route.
		if (subscriber == null) {
			return res.status(404).json({ message: "Cannot find subscriber " }); // 404 = cannot find something.
		}
	} catch (err) {
		return res.status(500).json({ message: err.message }); // 500 = something wrong with our server.
	}

	res.subscriber = subscriber;
	next();
}

module.exports = router;
