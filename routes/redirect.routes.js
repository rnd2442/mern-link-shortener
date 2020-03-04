const { Router } = require("express");
const Link = require("../models/Link");

const router = Router();

router.get("/:random", async (req, res) => {
  try {
    const link = await Link.findOne({ random: req.params.random });
    if (!link) {
      res.status(404).json({ message: "Link not found" });
    }

    link.clicks++;
    await link.save();
    return res.redirect(link.from);
  } catch (e) {
    // HTTP error
    res.status(500).json({ message: "Something wrong. Try again" });
  }
});

module.exports = router;
