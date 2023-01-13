import { setToken } from "../../../utils/trpc";
import { z } from "zod";

import { router, protectedProcedure, publicProcedure } from "../trpc";
import { google } from "googleapis";
export const tokenRouter = router({
  getToken: protectedProcedure.query(async ({ ctx }) => {
    const userId = await ctx.session.user.id;
    const accessToken = await ctx.prisma.account.findFirst({
      where: {
        userId,
      },
      select: {
        access_token: true,
      },
    });
    if (accessToken?.access_token) {
      await setToken(accessToken?.access_token);
    }
    return await { success: true, accessToken: accessToken?.access_token };
  }),

  getEvents: publicProcedure
    .input(z.string().optional().nullish())
    .query(async ({ ctx, input }) => {
      const calendarApi = google.calendar("v3").acl;
      const token: string | any = input;
      const calendar = await calendarApi.get({
        calendarId: "primary",
        ruleId: "get",
        oauth_token: token,
      });
      return {
        success: true,
        calendar,
      };
    }),
});
