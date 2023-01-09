import { eventsRouter } from "./events";
import { router } from "../trpc";
import { userRouter } from "./users";
import { authRouter } from "./auth";

export const appRouter = router({
  auth: authRouter,
  users: userRouter,
  events: eventsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
