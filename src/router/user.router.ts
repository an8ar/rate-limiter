import userController from "../controller/user.controller";
import BaseRouter from "./base.router";
import { authMiddleware } from "../middleware/auth-middleware";
class UserRouter extends BaseRouter {
  public routes(): void {
    this.router.post("/auth", userController.registerUser);
    this.router.get("/auth", authMiddleware, userController.getUser);
    this.router.post("/auth/login", userController.loginUser);
  }
}
export default new UserRouter().router;
