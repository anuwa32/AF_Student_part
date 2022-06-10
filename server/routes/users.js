const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });
    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: "Student with given email id is already Exist!" });
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    await new User({ ...req.body, password: hashPassword }).save();
    res.status(201).send({ message: "Student profile created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/getEmail/:email", (req, res) => {
  User.find({ email: req.params.email })
    .then((details) => res.json(details))
    .catch((err) => res.status(400).json("Error: " + err));
});
module.exports = router;
