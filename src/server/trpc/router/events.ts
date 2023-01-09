import { z } from "zod";

import { router, protectedProcedure } from "../trpc";


import { env } from "env/server.mjs";

export const eventsRouter = router({
  getEvents: protectedProcedure
    .input(
      z.object({
        apiKey: z.string().optional(),
        calendarId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const userId = await ctx.session.user.id;
      const accessToken = await ctx.prisma.account.findFirst({
        where: {
          userId,
        },
        select: {
          access_token: true,
        },
      });

     
      return await { success: true, accessToken };
    }),
});
