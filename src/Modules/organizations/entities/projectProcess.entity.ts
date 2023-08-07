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
import OrganizationProject from "./organizationProject.entity";
import ProjectProcessCard from "./projectProcessCard.entity";

@Table
export default class ProjectProcess extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    defaultValue: 1,
  })
  order_number: number;

  @ForeignKey(() => OrganizationProject)
  @Column(DataType.INTEGER)
  project_id: number;

  @BelongsTo(() => OrganizationProject)
  organization_project: OrganizationProject;

  @HasMany(() => ProjectProcessCard, "proj_process_id")
  project_process_card: ProjectProcessCard[];
}
