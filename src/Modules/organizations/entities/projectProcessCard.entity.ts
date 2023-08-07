import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import ProjectProcess from "./projectProcess.entity";

@Table
export default class ProjectProcessCard extends Model {
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

  @ForeignKey(() => ProjectProcess)
  @Column(DataType.INTEGER)
  proj_process_id: number;

  @BelongsTo(() => ProjectProcess)
  project_process: ProjectProcess;
}
