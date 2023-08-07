import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

import ProjectProcess from "./projectProcess.entity";
import Organization from "./organization.entity";

@Table
export default class OrganizationProject extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  active_status: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isPublic: boolean;

  @ForeignKey(() => Organization)
  @Column(DataType.INTEGER)
  org_id: number;

  @BelongsTo(() => Organization)
  organization: Organization;

  @HasMany(() => ProjectProcess, "project_id")
  project_process: ProjectProcess[];
}
