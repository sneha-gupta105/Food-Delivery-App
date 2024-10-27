const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = "mnbvcxzlkjhgfdsapoiuytrewqQAZWSX";

router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
    body("name").isLength({ min: 3 }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    // console.log(req.body)
    // let user = await User.findOne({email:req.body.email})
    const salt = await bcrypt.genSalt(10);
    let securePass = await bcrypt.hash(req.body.password, salt);
    try {
      await User.create({
        name: req.body.name,
        // password: req.body.password,  first write this and then use bcryptjs
        password: securePass,
        email: req.body.email,
        location: req.body.location,
      })
        .then((user) => {
          const data = {
            user: {
              id: user.id,
            },
          };
          const authToken = jwt.sign(data, jwtSecret);
          success = true;
          res.json({ success, authToken });
        })
        .catch((err) => {
          console.error(err); // Keeps the console log
          res.json({ success: false, error: "Please enter a unique value." }); // Returns consistent failure response
        });
        
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ success: false, error: "Internal Server Error" }); // Consistent failure response
    }
  }
);

router.post(
  "/loginuser",
  [
    body("email", "Input a valid email").isEmail(),
    body("password", "Password must contain atleast five characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
      let userdata = await User.findOne({ email });
      if (!userdata) {
        return res
          .status(400)
          .json({ errors: "Try logging in with correct credentials" });
      }

      const pwdCompare = await bcrypt.compare(
        req.body.password,
        userdata.password
      );
      if (!pwdCompare) {
        return res.status(400).json({ errors: "Incorrect Password" });
      }

      const data = {
        user: {
          id: userdata.id,
        },
      };

      const authToken = jwt.sign(data, jwtSecret);
      return res.json({ success: true, authToken: authToken });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
