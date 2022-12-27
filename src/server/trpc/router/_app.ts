import { router } from "../trpc";
import { userRouter } from "./users";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  users: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
