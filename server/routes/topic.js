const router = require("express").Router();
const { Topic, validate } = require("../models/topic");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => { 
	try {
		//console.log(req.body)
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const topic = await Topic.findOne({ groupName: req.body.groupName });
		if (topic)
			return res
				.status(409)
				.send({ message: "Topic with given Group Name already Exist!" });

		await new Topic({ ...req.body}).save();
		res.status(201).send({ message: "Topic registration successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

//get topic details

router.get("/getGroupId/:groupId",(req, res) => {
	Topic.find(
		{groupId:req.params.groupId})
	  .then((details) => res.json(details))
	  .catch((err) => res.status(400).json("Error: " + err));
  });



//update topic details

router.post("/update",async(req, res) => {

	console.log(req.body,"body")
	console.log(req.body.id)
	try {

		let b = {groupId:req.body.id};
	 let i = await Topic.findOneAndUpdate( b, req.body.data, function (err, docs) {
		if (err) {
		  console.log(err);
		} else {
		  console.log("Updated Topic : ", docs);
		}
	  });
	} catch {}
});

module.exports = router;