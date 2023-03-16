var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const { signin, signup, signout, requestPasswordReset, resetPassword, isSignedIn, verifyEmail, sendMail, getUser, Oauth } = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("name", "name should be at least 3 char").isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
    check("password", "password should be at least 3 char").isLength({
      min: 3,
    }),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email", "email is required").isEmail(),
    check("password", "password field is required").isLength({ min: 1 }),
  ],
  signin
);

router.post('/oauth' , Oauth);

router.get("/signout", signout);

router.post("/verifyEmail", isSignedIn, verifyEmail);
router.get("/sendMail", isSignedIn, sendMail);
router.get("/user/profile", isSignedIn, getUser);
router.post('/resetPasswordRequest',requestPasswordReset);
router.post('/resetPassword/:id',resetPassword);

module.exports = router;
