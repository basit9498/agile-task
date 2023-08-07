import express, { NextFunction, Request, Response, Router } from "express";
import Controller from "../../utils/core/controller.core";

class OrganizationController extends Controller {
  protected path: string = "/organization";
  router: Router;

  constructor() {
    super();
    this.router = express.Router();
    this.initializeRouter();
  }
  initializeRouter(): void {
    // org
    this.router.post(this.path, this.getAll); // create org
    this.router.put(this.path, this.getAll); // update org
    this.router.delete(this.path, this.getAll); // delete org
    this.router.get(this.path, this.getAll); // get org
    // org project
    this.router.post(this.path.concat("/project"), this.getAll); // create org project
    this.router.put(this.path.concat("/project"), this.getAll); // update org project
    this.router.delete(this.path.concat("/project"), this.getAll); // delete org project
    this.router.get(this.path.concat("/project"), this.getAll); // get org project
    this.router.put(this.path.concat("/project/user"), this.getAll); // org project assign user
    this.router.delete(this.path.concat("/project/user"), this.getAll); // org project remove user
    // org project cards
    this.router.post(this.path.concat("/project/card"), this.getAll); // create org project card
    this.router.put(this.path.concat("/project/card"), this.getAll); // update org project card
    this.router.delete(this.path.concat("/project/card"), this.getAll); // delete org project card
    this.router.get(this.path.concat("/project/card"), this.getAll); // get org project card
    this.router.put(this.path.concat("/project/card/move"), this.getAll); // move org project card
  }

  //   get All Organization
  async getAll(req: Request, res: Response, next: NextFunction) {
    res.json({ organization: "Yes" });
  }
}

export default OrganizationController;
