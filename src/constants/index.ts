export const IS_PROD = process.env.NODE_ENV === "production" ? true : false;
export const PORT = 3001 || process.env.PORT!;
export const GENDERS = ["male", "female", "MALE", "FEMALE", "Male", "Female"];
export const ACCESS_LEVEL_ARRAY = ["Level 1", "Level 2", "Level 3"];
/** model name */
export const MODEL_ACCOUNT = "account";
export const MODEL_USER = "user";

/** select & returning table columns */
export const USER_RETURNING_TABLE_COLUMNS =
  "id,fullname,gender,birthdate,age,address";
export const USER_TABLE_COLUMNS = [
  "user.id",
  "user.fullname",
  "user.gender",
  "user.birthdate",
  "user.address",
];
export const ACCOUNT_RETURNING_TABLE_COLUMNS =
  "id,email,mobilenumber,accesslevel";
export const ACCOUNT_TABLE_COLUMNS = [
  "account.id",
  "account.email",
  "account.mobilenumber",
  "account.accesslevel",
];
/** fields name */
export const MOBILE_NUMBER = "mobilenumber";
export const EMAIL = "email";
export const PASSWORD = "password";
export const ACCESS_LEVEL = "accesslevel";
export const FULLNAME = "fullname";
export const GENDER = "gender";
export const BIRTHDATE = "birthdate";
export const AGE = "age";
export const ADDRESS = "address";
