import { PrismaClient } from "@prisma/client";

export class NotesService {
  prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  async createNote(note: string, userId: number) {
    return await this.prisma.note.create({ data: { data: note, userId } });
  }
  async deleteNote(noteId: number) {
    return this.prisma.note.delete({ where: { id: noteId } });
  }

  async updateNote(noteId: number, note: string) {
    return this.prisma.note.update({
      where: { id: noteId },
      data: { data: note },
    });
  }
  async getAllNotes(userId: number) {
    return this.prisma.note.findMany({ where: { userId } });
  }

  async getNote(noteId: number) {
    const note = await this.prisma.note.findUnique({ where: { id: noteId } });
    if (note) {
      return note;
    }
    return new Error("Note was not found");
  }
}
