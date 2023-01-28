import { body, ValidationChain, query } from "express-validator";
import { UserModel } from "../../../../models";
import { findOneRepo } from "../../../../repository";
import {
  GENDERS,
  FULLNAME,
  GENDER,
  BIRTHDATE,
  ADDRESS,
  MODEL_USER,
  USER_TABLE_COLUMNS,
} from "./../../../../constants/index";

const validatePutRequest: ValidationChain[] = [
  query("id")
    .isUUID()
    .rtrim()
    .withMessage("Must be a valid id")
    .custom(async (value) => {
      const user = await findOneRepo(
        UserModel,
        MODEL_USER,
        USER_TABLE_COLUMNS,
        "user.id = :value",
        { value }
      );
      if (!user) {
        return Promise.reject("User does not exist");
      }
      return;
    })
    .bail(),
  body(FULLNAME)
    .rtrim()
    .isString()
    .isLength({
      max: 40,
      min: 4,
    })
    .withMessage(
      "Must be string.Minimum of 4 characters.Maximum of 20 characters`"
    )
    .trim()
    .toLowerCase(),
  body(GENDER)
    .isIn(GENDERS)
    .withMessage(`Must have a valid gender.[${GENDERS}]`),
  body(BIRTHDATE).isDate().withMessage(`Must have a valid birthdate`),
  body(ADDRESS)
    .rtrim()
    .isString()
    .isLength({
      max: 200,
      min: 10,
    })
    .withMessage(
      "Must be string.Minimum of 10 characters.Maximum of 200 characters`"
    )
    .trim()
    .toLowerCase(),
];

export default validatePutRequest;
