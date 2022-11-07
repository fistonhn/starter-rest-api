const router = require("express").Router();
const Feedback = require("../models/Feedback");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

//Send new feedback
router.post("/", async (req, res) => {
  const newFeedback = new Feedback({
    username: req.body.username,
    email: req.body.email,
    message: req.body.message,
  });

  try {
    const savedFeedback = await newFeedback.save();
    res.status(201).json(savedFeedback);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET FEEDBACK
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    res.status(200).json(feedback);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL FEEDBACKS
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const feedbacks = query
      ? await Feedback.find().sort({ _id: -1 }).limit(5)
      : await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
