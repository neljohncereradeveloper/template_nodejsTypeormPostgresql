import { IAccountProps, MAccountProps } from "./../../types/models";
import {
  MODEL_ACCOUNT,
  ACCOUNT_TABLE_COLUMNS,
  ACCOUNT_RETURNING_TABLE_COLUMNS,
} from "./../../constants/index";
import { Request, Response } from "express";
import { returnError, returnOk } from "../../helper";
import { AccountModel } from "../../models";
import { findRepo, updateRepo } from "../../repository";

/**
 * Controller get accounts
 *
 * @param req `Request`
 * @param res `Response`
 * @returns `Promise`
 */
const getAccounts = async (req: Request, res: Response): Promise<Response> => {
  try {
    const accounts = await findRepo<MAccountProps>(
      AccountModel,
      MODEL_ACCOUNT,
      ACCOUNT_TABLE_COLUMNS
    );
    return returnOk(res, { data: accounts });
  } catch (error) {
    return returnError(req, res);
  }
};
/**
 * Controller update account
 *
 * @param req `Request`
 * @param res `Response`
 * @returns `Promise`
 */
const updateAccount = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.query;
  const { accountinput } = req.body;
  try {
    const user = await updateRepo<MAccountProps, IAccountProps>(
      AccountModel,
      accountinput,
      id as string,
      ACCOUNT_RETURNING_TABLE_COLUMNS
    );
    return returnOk(res, { data: user });
  } catch (error) {
    return returnError(req, res);
  }
};

export default { getAccounts, updateAccount };
