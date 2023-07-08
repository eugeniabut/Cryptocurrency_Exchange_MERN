import { body } from "express-validator";

export const userRules = [
  body("userName").notEmpty().withMessage("First name is required").trim(),
  body("lastName").notEmpty().withMessage("Last name is required").trim(),
  body("email", "Email is required").isEmail().normalizeEmail(),
  body("password", "Password is required and length minimum 4 character")
    .isLength({ min: 4 })
    .custom((val, { req }) => {
      if (val !== req.body.confirmPassword) {
        throw new Error(`Password don't match!`);
      } else {
        return val;
      }
    }),
];
