import { Optional } from "sequelize";
import {
  Model,
  Column,
  Table,
  AllowNull,
  Unique,
  AutoIncrement,
  Default,
  PrimaryKey,
  BeforeUpdate,
  BeforeCreate,
  HasMany,
  BelongsToMany,
} from "sequelize-typescript";
import { UserAttributes } from "../../../utils/interface/modules/user.interface";
import bcrypt from "bcryptjs";
import UserOrganization from "../../organizations/entities/userOrganization.entity";
import Organization from "../../organizations/entities/organization.entity";

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

@Table
export default class User extends Model<
  UserAttributes,
  UserCreationAttributes
> {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Unique
  @Column
  email: string;

  @AllowNull(false)
  @Column
  password: string;

  @Default(false)
  @Column
  active_status: boolean;

  @HasMany(() => Organization, "owner_id")
  organizations: Organization[];

  @BelongsToMany(() => Organization, () => UserOrganization)
  users_organizations: Organization[];

  @Column
  declare createdAt: Date;

  @Column
  declare updatedAt: Date;

  @BeforeUpdate
  @BeforeCreate
  static async hasPassword(instance: User) {
    instance.password = await bcrypt.hash(instance.password, 12);
  }

  // public toJSON(): UserCreationAttributes {
  //   const json = { ...this.get() };
  //   delete json.password;
  //   return json;
  // }
}
