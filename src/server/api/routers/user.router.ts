import { createTRPCRouter, publicProcedure } from "../trpc";
import UserEntity from "@/server/business-logic/user.entity";

export const userRouter = createTRPCRouter({
  createTemporary: publicProcedure.mutation(async () => {
    const data = await new UserEntity().createTemporary();
    return data;
  }),
});
