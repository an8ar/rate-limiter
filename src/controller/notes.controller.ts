import { NextFunction, Request, Response } from "express";
import { NotesService } from "../services/notes.service";

class NotesController {
  private notesService = new NotesService();

  createNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { data } = req.body;
      const { userId } = req.user;
      const note = await this.notesService.createNote(data, userId);
      res.locals.response = {
        message: "Note created successfully",
        data: note,
        statusCode: 201,
      };
      next();
    } catch (error) {
      next(error);
    }
  };

  updateNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { data } = req.body;
      console.log(req.params);
      const { id: noteId } = req.params;
      const note = await this.notesService.updateNote(+noteId, data);
      res.locals.response = {
        message: "Note updated successfully",
        data: note,
        statusCode: 204,
      };
      next();
    } catch (error) {
      next(error);
    }
  };
  deleteNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: noteId } = req.params;
      const note = await this.notesService.deleteNote(+noteId);
      res.locals.response = {
        message: "Note deleted successfully",
        data: note,
        statusCode: 204,
      };
      next();
    } catch (error) {
      next(error);
    }
  };
  getAllNotes = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.user;
      const notes = await this.notesService.getAllNotes(userId);
      res.locals.response = {
        message: "Here is all notes",
        data: notes,
        statusCode: 200,
      };
      next();
    } catch (error) {
      next(error);
    }
  };
  getNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { noteId } = req.body;
      const note = await this.notesService.getNote(noteId);
      res.locals.response = {
        message: "Here is a note",
        data: note,
        statusCode: 200,
      };
      next();
    } catch (error) {
      next(error);
    }
  };
}

export default new NotesController();
