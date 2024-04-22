import { Router } from "express";

abstract class BaseRouter implements IRouter {
  public router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }

  abstract routes(): void;
}

export default BaseRouter;

interface IRouter {
  routes(): void;
}
