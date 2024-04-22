// import { checkJWT } from "../middleware/authMiddleware";
import { authMiddleware } from "../middleware/auth-middleware";
import BaseRouter from "./base.router";
import UserRouter from "./user.router";
import NotesRouter from "./notes.router";
class IndexRouter extends BaseRouter {
  public routes(): void {
    // this.router.use("/todo", checkJWT,TodoRouter);
    this.router.use(UserRouter);
    this.router.use(authMiddleware, NotesRouter);
  }
}

export default new IndexRouter().router;
