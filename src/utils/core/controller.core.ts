import { Router } from "express";

abstract class Controller {
  protected abstract path: string;
  abstract router: Router;
  abstract initializeRouter(): void;
}

export default Controller;
