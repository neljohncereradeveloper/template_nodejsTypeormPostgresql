import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from "typeorm";
import { GENDERS } from "../../constants";
import { GenderProps } from "../../types/models";

@Entity("user")
class UserModel extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  fullname: string;

  @Column({ type: "enum", enum: GENDERS })
  gender: GenderProps;

  @Column("date")
  birthdate: Date;

  @Column("integer")
  age: number;

  @Column("text")
  address: string;

  @CreateDateColumn()
  createdat: Date;

  @UpdateDateColumn()
  updatedat: Date;
}

export default UserModel;
