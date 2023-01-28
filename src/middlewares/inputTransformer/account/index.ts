import { Request, Response, NextFunction } from "express";
import { IAccountProps } from "../../../types/models";

const transformUpdateInput = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const { accesslevel, email, mobilenumber }: IAccountProps = req.body;

  let accountinput = {
    accesslevel,
    email,
    mobilenumber,
  } as IAccountProps;
  req.body = { accountinput };

  return next();
};

export default {
  transformUpdateInput,
};
