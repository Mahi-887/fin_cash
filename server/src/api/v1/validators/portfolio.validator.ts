import { body } from "express-validator";

export const createPortfolioValidator = [
  body("name").trim().isLength({ min: 1, max: 100 }).withMessage("Name is required (max 100 chars)"),
  body("description").optional().isLength({ max: 500 }).withMessage("Description max 500 chars"),
];

export const addHoldingValidator = [
  body("symbol").trim().toUpperCase().isLength({ min: 1, max: 5 }).withMessage("Valid ticker symbol required"),
  body("name").trim().isLength({ min: 1 }).withMessage("Asset name is required"),
  body("quantity").isFloat({ gt: 0 }).withMessage("Quantity must be positive"),
  body("averageCost").isFloat({ gt: 0 }).withMessage("Average cost must be positive"),
  body("currentPrice").isFloat({ gt: 0 }).withMessage("Current price must be positive"),
];
