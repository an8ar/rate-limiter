import BaseRouter from "./base.router";
import { authMiddleware } from "../middleware/auth-middleware";
import notesController from "../controller/notes.controller";
import { rateLimiterMiddleware } from "../middleware/rate-limitter-middleware";

class NotesRouter extends BaseRouter {
  public routes(): void {
    this.router.get("/notes", notesController.getAllNotes);
    this.router.post(
      "/notes",
      rateLimiterMiddleware,
      notesController.createNote
    );
    this.router.put("/notes/:id", notesController.updateNote);
    this.router.delete("/notes/:id", notesController.deleteNote);
  }
}
export default new NotesRouter().router;
