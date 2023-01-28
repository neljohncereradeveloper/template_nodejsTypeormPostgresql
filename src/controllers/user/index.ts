import {
  IAccountProps,
  IUserProps,
  MAccountProps,
  MUserProps,
} from "./../../types/models";
import { Request, Response } from "express";
import { returnError, returnOk } from "../../helper";
import { AccountModel, UserModel } from "../../models";
import {
  findRepo,
  findOneRepo,
  createRepo,
  updateRepo,
} from "../../repository";
import {
  ACCOUNT_RETURNING_TABLE_COLUMNS,
  MODEL_USER,
  USER_RETURNING_TABLE_COLUMNS,
  USER_TABLE_COLUMNS,
} from "../../constants";

/**
 * Controller create user
 *
 * @param req `Request`
 * @param res `Response`
 * @returns `Promise`
 */
const createUser = async (req: Request, res: Response): Promise<Response> => {
  const { userinput, accountinput } = req.body;
  try {
    await createRepo<MAccountProps, IAccountProps>(
      AccountModel,
      [accountinput],
      ACCOUNT_RETURNING_TABLE_COLUMNS
    );
    const user = await createRepo<MUserProps, IUserProps>(
      UserModel,
      [userinput],
      USER_RETURNING_TABLE_COLUMNS
    );
    return returnOk(res, { data: user.raw[0] });
  } catch (error) {
    return returnError(req, res);
  }
};
/**
 * Controller update user
 *
 * @param req `Request`
 * @param res `Response`
 * @returns `Promise`
 */
const updateUser = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.query;
  const { userinput } = req.body;
  try {
    const user = await updateRepo<MUserProps, IUserProps>(
      UserModel,
      userinput,
      id as string,
      USER_RETURNING_TABLE_COLUMNS
    );
    return returnOk(res, { data: user });
  } catch (error) {
    return returnError(req, res);
  }
};

/**
 * Controller find users
 *
 * @param req `Request`
 * @param res `Response`
 * @returns `Promise`
 */
const getUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const users = await findRepo<MUserProps>(
      UserModel,
      MODEL_USER,
      USER_TABLE_COLUMNS
    );
    return returnOk(res, { data: users });
  } catch (error) {
    return returnError(req, res);
  }
};

/**
 * Controller find user BY FULLNAME
 *
 * @param req `Request`
 * @param res `Response`
 * @returns `Promise`
 */
const getUserByName = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { fullname } = req.query;
  try {
    const users = await findOneRepo(
      UserModel,
      MODEL_USER,
      USER_TABLE_COLUMNS,
      "user.fullname = :fullname",
      { fullname }
    );
    return returnOk(res, { data: users });
  } catch (error) {
    return returnError(req, res);
  }
};

export default {
  getUsers,
  createUser,
  getUserByName,
  updateUser,
};
