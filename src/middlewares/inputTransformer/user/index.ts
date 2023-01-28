import { Request, Response, NextFunction } from "express";
import { IAccountProps, IUserProps } from "../../../types/models";
import { getAge } from "../../../utils";

const transformCreateInput = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const {
    fullname,
    gender,
    birthdate,
    address,
    accesslevel,
    email,
    mobilenumber,
  }: IUserProps & IAccountProps = req.body;

  let userinput = {
    fullname,
    gender,
    birthdate,
    address,
    age: getAge(birthdate),
  } as IUserProps;
  let accountinput = {
    accesslevel,
    email,
    mobilenumber,
    password: "password",
  } as IAccountProps;
  req.body = { userinput, accountinput };

  return next();
};

const transformUpdateInput = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const { fullname, gender, birthdate, address }: IUserProps = req.body;

  let userinput = {
    fullname,
    gender,
    birthdate,
    address,
    age: getAge(birthdate),
  } as IUserProps;

  req.body = { userinput };

  return next();
};
export default {
  transformCreateInput,
  transformUpdateInput,
};
