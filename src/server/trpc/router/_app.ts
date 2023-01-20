import { calendarRouter } from "./calendar";
import { router } from "../trpc";
import { userRouter } from "./users";
import { authRouter } from "./auth";

export const appRouter = router({
  auth: authRouter,
  users: userRouter,
  calendar: calendarRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
