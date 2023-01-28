import express from "express";
import { userController } from "../../controllers";
import {
  validatePostRequest,
  validatePutRequest,
} from "../../middlewares/validation/user";
import { userInputTransformer } from "../../middlewares/inputTransformer";
import { returnValidationErrors } from "../../helper";
const { getUsers, createUser, getUserByName, updateUser } = userController;
const { transformCreateInput, transformUpdateInput } = userInputTransformer;

/** user main routes */
const router = express.Router();
router
  .route("/")
  .get(getUsers)
  .post(
    validatePostRequest,
    returnValidationErrors,
    transformCreateInput,
    createUser
  )
  .put(
    validatePutRequest,
    returnValidationErrors,
    transformUpdateInput,
    updateUser
  );
router.route("/search").get(getUserByName);

export default router;
