const { Router } = require("express");
const config = require("config");
const Link = require("../../models/Link");
const authMiddleware = require("../../middleware/authMiddleware");
//const nanoid = require("nanoid");
const shortid = require("shortid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { check, validationResult } = require("express-validator");
const router = Router();
// /api/auth/register
router.post("/generate", authMiddleware, async (req, res) => {
  try {
    const baseUrl = config.get("baseURL");
    const { from } = req.body;
    const code = shortid.generate();
    const existing = await Link.findOne({ from });
    if (existing) {
      return res.json({ link: existing });
    }
    const to = baseUrl + "/t/" + code;
    const link = new Link({
      code,
      to,
      from,
      owner: req.user.userId,
    });

    await link.save();
    res.status(201).json({ link });
  } catch (err) {
    res.status(500).json({ message: "Something wrong, try again later..." });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId }); //????
    res.json(links);
  } catch (err) {
    res.status(500).json({ message: "Something wrong, try again later..." });
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id); //????
    res.json(link);
  } catch (err) {
    res.status(500).json({ message: "Something wrong, try again later..." });
  }
});
module.exports = router;
