import { body, ValidationChain, query } from "express-validator";
import { AccountModel } from "../../../../models";
import { findOneRepo } from "../../../../repository";
import {
  ACCESS_LEVEL,
  ACCESS_LEVEL_ARRAY,
  MOBILE_NUMBER,
  EMAIL,
  MODEL_ACCOUNT,
  ACCOUNT_TABLE_COLUMNS,
} from "./../../../../constants/index";

const validatePutRequest: ValidationChain[] = [
  query("id")
    .isUUID()
    .rtrim()
    .withMessage("Must be a valid id")
    .custom(async (value) => {
      const account = await findOneRepo(
        AccountModel,
        MODEL_ACCOUNT,
        ACCOUNT_TABLE_COLUMNS,
        "account.id = :value",
        { value }
      );
      if (!account) {
        return Promise.reject("Account does not exist");
      }
      return;
    })
    .bail(),
  body(EMAIL)
    .rtrim()
    .isEmail()
    .withMessage("Must be a valid email address")
    .bail()
    .isString()
    .isLength({
      max: 20,
      min: 12,
    })
    .withMessage(
      "Must be a string,Minimum of 12 characters,Maximum of 20 characters`"
    )
    .bail()
    .custom(async (value) => {
      const account = await findOneRepo(
        AccountModel,
        MODEL_ACCOUNT,
        ACCOUNT_TABLE_COLUMNS,
        "account.email = :value",
        { value }
      );
      if (account) {
        return Promise.reject("Email already in use");
      }
      return;
    })
    .trim()
    .normalizeEmail()
    .toLowerCase(),
  body(MOBILE_NUMBER)
    .rtrim()
    .isMobilePhone(["en-PH"])
    .withMessage("Must be a valid phone number"),
  body(ACCESS_LEVEL)
    .isIn(ACCESS_LEVEL_ARRAY)
    .withMessage("Must have a valid access"),
];

export default validatePutRequest;
