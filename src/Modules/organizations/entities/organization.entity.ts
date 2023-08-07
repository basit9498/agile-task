import { Optional } from "sequelize";
import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import User from "../../user/entities/user.entity";
import UserOrganization from "./userOrganization.entity";
import OrganizationProject from "./organizationProject.entity";

interface OrgCreationAttributes
  extends Optional<OrganizationAttributes, "id"> {}

@Table
export default class Organization extends Model<
  OrganizationAttributes,
  OrgCreationAttributes
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @AllowNull(false)
  @Column(DataType.TEXT)
  name: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
    defaultValue:
      "https://www.shutterstock.com/image-vector/abstract-initial-letter-c-o-260nw-1728284956.jpg",
  })
  logo: string;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  owner_id: number; //user

  @BelongsTo(() => User)
  user: User;

  @BelongsToMany(() => User, () => UserOrganization)
  users_organizations: Organization[];

  @HasMany(() => OrganizationProject, "org_id")
  organization_project: OrganizationProject[];
}

export interface OrganizationAttributes {
  id?: number;
  name: string;
  logo: string;
  owner_id: number;
}
