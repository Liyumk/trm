import { prisma } from "../db";

export default class UserEntity {
  async createTemporary() {
    return await prisma.user.create({ data: {} });
  }
}
