const { Router } = require("express");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const router = Router();
// /api/auth/register
router.post(
  "/register",
  [
    check("email", "Incorrect email").isEmail(),
    check("password", "minimum password length 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        //если объект с ошибками не пустой => есть ошибки
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect email or password",
        });
      }
      const { email, password } = req.body; //получаю в теле запроса

      const candidate = await User.findOne({ email });
      if (candidate) {
        return res.status(400).json({
          message: `We have User with ${email} email, try another one email`,
        });
      }
      const hashedPassword = await bcrypt.hash(password, 12); //хэширую пароль
      const user = new User({ email, password: hashedPassword }); //создаем нового юзера
      await user.save();
      res.status(201).json({ message: " New user was created" });
    } catch (err) {
      res.status(500).json({ message: "Something wrong, try again later..." });
    }
  }
);

router.post(
  "/login",
  [
    check("email", "Incorrect email").normalizeEmail().isEmail(),
    check("password", "minimum password length 6 characters").exists(), //должен существовать
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        //если объект с ошибками не пустой => есть ошибки
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect email or password",
        });
      }

      const { email, password } = req.body; //получаю в теле запроса

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({
          message: `No User with ${email} email, try another email`,
        });
      }
      const isMatchedPassword = await bcrypt.compare(password, user.password);
      if (!isMatchedPassword) {
        return res.status(400).json({
          message: `Password is wrong`,
        });
      }

      const token = jwt.sign({ userId: user.id }, config.get("jwtSecretKey"), {
        expiresIn: "2h",
      });

      res.json({ token, userId: user.id });
    } catch (err) {
      res.status(500).json({ message: "Something wrong, try again later..." });
    }
  }
);

module.exports = router;
