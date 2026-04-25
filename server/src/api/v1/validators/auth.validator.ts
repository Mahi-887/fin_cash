import { body } from "express-validator";

export const loginValidator = [
  body("email").isEmail().normalizeEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

export const registerValidator = [
  body("name").trim().isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),
  body("email").isEmail().normalizeEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 8 })
    .matches(/[A-Z]/)
    .matches(/[0-9]/)
    .withMessage("Password must be 8+ chars with at least one uppercase letter and number"),
];
