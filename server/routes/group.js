const router = require("express").Router();
const { Group, validate } = require("../models/group");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const group = await Group.findOne({ groupName: req.body.groupName });
    if (group)
      return res
        .status(409)
        .send({ message: "Group with given Group Name already Exist!" });

    await new Group({ ...req.body }).save().then((resp) => {
      console.log(resp);
      res
        .status(201)
        .send({ data: resp._id, message: "Group registration successfully" });
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
