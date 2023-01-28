export type GenderProps =
  | "male"
  | "female"
  | "MALE"
  | "FEMALE"
  | "Male"
  | "Female";

export type AccessLevelProps = "Level 1" | "Level 2" | "Level 3";

/** account model props */
export type IAccountProps = {
  accesslevel: AccessLevelProps;
  mobilenumber: string;
  password?: string;
  email: string;
  isactive?: boolean;
};
export type MAccountProps = IAccountProps;

/** user model props */
export type IUserProps = {
  fullname: string;
  gender: GenderProps;
  birthdate: Date;
  age: number;
  address: string;
};
export type MUserProps = IUserProps;
