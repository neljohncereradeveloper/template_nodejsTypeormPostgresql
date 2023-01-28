import express from "express";
import { accountInputTransformer } from "../../middlewares/inputTransformer";
import { returnValidationErrors } from "../../helper";
import { accountController } from "../../controllers";
import { validatePutRequest } from "../../middlewares/validation/account";
const { getAccounts, updateAccount } = accountController;
const { transformUpdateInput } = accountInputTransformer;

/** account main routes */
const router = express.Router();
router
  .route("/")
  .get(getAccounts)
  .put(
    validatePutRequest,
    returnValidationErrors,
    transformUpdateInput,
    updateAccount
  );

export default router;
