const router = require("express").Router();
const { Tutor, validateTutor } = require("../models/tutorModel");
const bcrypt = require("bcrypt");


// REGISTER TUTOR
router.post("/signup/tutor", async (req, res) => {
  try {
    const { error } = validateTutor(req.body);
    if (error) {
      return res.status(401).send(error.details[0].message);
    }
    const tutor = await Tutor.findOne({ email: req.body.email });
    if (tutor) {
      return res.status(401).send("Tutor already registered.");
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    await new Tutor({ ...req.body, password: hashedPassword }).save();
    res.status(201).send({ message: "Tutor registered successfully." });
  } 
  catch (err) {
    res.status(500).send(err.message);
  }
});


// GET ALL REGISTERED TUTORS
router.get("/tutor/result", async (req, res) => {
  try {
    const data = await Tutor.find();
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ data });
  }
});

module.exports = router;
