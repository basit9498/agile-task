import {
  AutoIncrement,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import User from "../../user/entities/user.entity";
import Organization from "./organization.entity";

@Table
export default class UserOrganization extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId: number;

  @ForeignKey(() => Organization)
  @Column(DataType.INTEGER)
  org_id: number;

  //   In Future will add permissions
}
