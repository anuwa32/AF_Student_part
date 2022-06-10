const mongoose = require("mongoose");
//const jwt = require("jsonwebtoken");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  //Topic registration details

  groupId: { type: String, required: true },
  groupName: { type: String, required: true },
  topic: { type: String, required: true },
  year: { type: String, required: true },
  supervisor: { type: String, required: true },
  coSupervisor: { type: String, required: true },
  feedback: {type: String, required: false},
});

const Topic = mongoose.model("topic", userSchema);

const validate = (data) => {
  
  const schema = Joi.object({
    groupId: Joi.string().required().label("Group Id"),
    groupName: Joi.string().required().label("Group Name"),
    topic: Joi.string().required().label("Topic Name"),
    year: Joi.string().required().label("Year"),
    supervisor: Joi.string().required().label("Supervisor Name"),
    coSupervisor: Joi.string().required().label("Co-Supervisor Name"),
    //feedback: Joi.string().label("Feedback"),           
  });
  return schema.validate(data);
};

module.exports = { Topic, validate };
