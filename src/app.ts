import express, { Application } from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import compression from "compression";
import { SequelizeOptions, Sequelize } from "sequelize-typescript";

// import Controller from "./utils/interface/controller.interface";
import errorMiddlewareHandler from "./middlewares/errorMiddlewareHandler";
import Controller from "./utils/core/controller.core";
import { dataResourceOptions } from "./config/datasource";
import User from "./Modules/user/entities/user.entity";
import Organization from "./Modules/organizations/entities/organization.entity";
import OrganizationProject from "./Modules/organizations/entities/organizationProject.entity";
import ProjectProcess from "./Modules/organizations/entities/projectProcess.entity";
import ProjectProcessCard from "./Modules/organizations/entities/projectProcessCard.entity";
import UserOrganization from "./Modules/organizations/entities/userOrganization.entity";

class App {
  public express: Application;
  public port: number;
  private dataSource: SequelizeOptions = dataResourceOptions;
  private dataConnection: Sequelize | undefined;
  private controllers: Controller[];
  private readonly controllerCallback: (app: App) => Controller[];

  constructor(port: number, callback: (app: App) => Controller[]) {
    this.port = port;
    this.express = express();
    this.controllerCallback = callback;
    this.initializationDatabaseConnection();
    this.initializationMiddleware();
    this.initializationController();
    this.initializationErrorHandler();
  }

  // database connection
  private async initializationDatabaseConnection() {
    this.dataConnection = new Sequelize(this.dataSource);
    this.dataConnection.addModels([
      User,
      Organization,
      OrganizationProject,
      ProjectProcess,
      ProjectProcessCard,
      UserOrganization,
    ]);
    await this.dataConnection.authenticate();
  }

  // middleware
  private initializationMiddleware(): void {
    this.express.use(helmet());
    this.express.use(cors());
    this.express.use(morgan("dev"));
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(express.json());
    this.express.use(compression());
  }
  // router controllers
  private initializationController(): void {
    this.controllers = this.controllerCallback(this);
    this.controllers.forEach((controller) => {
      this.express.use("/api/v1", controller.router);
    });
  }

  //error handler
  private initializationErrorHandler(): void {
    this.express.use(errorMiddlewareHandler);
  }

  //   app listen
  public appListen(): void {
    this.express.listen(this.port, () => {
      console.log("Server run on Port:", this.port);
    });
  }
}

export default App;
