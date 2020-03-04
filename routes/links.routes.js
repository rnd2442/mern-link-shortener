const { Router } = require("express");
const shortid = require("shortid");

const Link = require("../models/Link");

// This middleware validates token from client
const auth = require("../middleware/auth.middleware");

const router = Router();

// /generate <-- Generate link
router.post("/generate", auth, async (req, res) => {
  try {
    const { from } = req.body;

    const existinglink = await Link.findOne({ from });
    if (existinglink) {
      return res.json({ link: existinglink });
    }

    const baseUrl = process.env.BASE_URL;
    const random = shortid.generate();

    // Build short link
    const to = baseUrl + "/t/" + random;
    console.log("to", to);

    const link = new Link({
      from,
      to,
      random,
      owner: req.user.userId,
    });

    await link.save();

    res.status(201).json({ link });
  } catch (e) {
    // HTTP error
    console.log(e);
    res.status(500).json({ message: "Something wrong. Try again /generate" });
  }
});

// / <-- Get all links
router.get("/", auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId });
    res.json(links);
  } catch (e) {
    // HTTP error
    res.status(500).json({ message: "Something wrong. Try again" });
  }
});

// / <-- Get link by ID
router.get("/:id", auth, async (req, res) => {
  try {
    // req.params.id <-- This is :id
    const link = await Link.findById(req.params.id);
    res.json(link);
  } catch (e) {
    // HTTP error
    res.status(500).json({ message: "Something wrong. Try again" });
  }
});

module.exports = router;
