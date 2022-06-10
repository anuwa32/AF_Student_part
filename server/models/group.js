const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({ //Group registration details
	Sid:{type:String, required:true},
	groupName: {type: String, required: true},
	leaderName: { type: String, required: true },
	memTwo: { type: String, required: true },
	memThree: { type: String, required: true },
	memFour: { type: String, required: true },
	
});

const Group = mongoose.model("group", userSchema);

const validate = (data) => {
	const schema = Joi.object({
		Sid: Joi.string().required().label("Student Id"),
		groupName: Joi.string().required().label("Group Name"),
		leaderName: Joi.string().required().label("Group Leader"),
		memTwo: Joi.string().required().label("Member Two"),
		memThree: Joi.string().required().label("Member Three"),
		memFour: Joi.string().required().label("Member Four"),
		
	});
	return schema.validate(data);
};

module.exports = { Group, validate };