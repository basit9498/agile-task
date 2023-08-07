import { SequelizeOptions } from "sequelize-typescript";
import { config } from "dotenv";
import User from "../Modules/user/entities/user.entity";

config();

export const dataResourceOptions = {
  dialect: process.env.DB_DIALECTS,
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  models: [__dirname + "/../**/entities/*.model.{js,ts}"],
} as SequelizeOptions;
