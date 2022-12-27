import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const userRouter = router({
  getAll: publicProcedure.query(async () => {
    const users = await fetch("https://fakestoreapi.com/users?limit=6").then(
      (res) => res.json()
    );
    return await users;
  }),
});
