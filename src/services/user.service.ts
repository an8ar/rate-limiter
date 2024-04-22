import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import ApiError from "../exception/apiError";

export class UserService {
  prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  async createUser(email: string, password: string) {
    const userExists = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (userExists) {
      throw ApiError.BadRequest("User already exists");
    }

    return this.prisma.user.create({ data: { email, password } });
  }

  async loginUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email: email } });
    if (!user) throw ApiError.BadRequest("Email not registered");
    if (!bcrypt.compareSync(password, user.password))
      throw ApiError.BadRequest("Wrong password");

    return user;
  }

  async getUserById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }
}
