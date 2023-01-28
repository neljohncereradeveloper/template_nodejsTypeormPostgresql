import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { ACCESS_LEVEL_ARRAY } from "../../constants";
import { AccessLevelProps } from "../../types/models";

@Entity("account")
class AccountModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "enum", enum: ACCESS_LEVEL_ARRAY })
  accesslevel: AccessLevelProps;

  @Column({ type: "text" })
  mobilenumber: string;

  @Column("text")
  password: string;

  @Column("text")
  email: string;

  @Column("boolean", { default: true })
  isactive: boolean;

  @CreateDateColumn()
  createdat: Date;

  @UpdateDateColumn()
  updatedat: Date;
}

export default AccountModel;
