import "dotenv/config";

import App from "./app";
import UserController from "./Modules/user/users.controller";
import validationEnv from "./utils/validation/validateEnv";
import OrganizationController from "./Modules/organizations/organization.controller";

validationEnv();

class Server {
  private static app: App;

  public static init() {
    if (!this.app) {
      this.app = new App(
        Number(process.env.PORT),
        this.controllerInitialization
      );
    }

    return this.app;
  }

  public static controllerInitialization(app: App) {
    return [new UserController(), new OrganizationController()];
  }
}

export default Server;
// const app = new App(Number(process.env.PORT), controllerInitialization);

// app.appListen();

//Controller Initialization function
// function controllerInitialization(app: App) {
//   return [new UserController(), new OrganizationController()];
// }
