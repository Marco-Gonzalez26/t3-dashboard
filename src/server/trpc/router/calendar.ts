import { setToken } from "../../../utils/trpc";
import { z } from "zod";

import { router, protectedProcedure } from "../trpc";

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

  getEvents: protectedProcedure.query(async ({ ctx, input }) => {
    const events = await ctx.prisma.citas.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      select: {
        titulo: true,
        fecha: true,
        hora: true,
        id: true,
      },
    });

    return { success: true, events };
  }),
  createEvent: protectedProcedure
    .input(
      z.object({
        pacienteId: z.any(),
        titulo: z.string(),
        hora: z.string(),
        fecha: z.date(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const event = await ctx.prisma.citas.create({
        data: {
          pacienteId: input.pacienteId,
          titulo: input.titulo,
          fecha: input.fecha,
          hora: input.hora,
          userId: ctx.session.user.id,
        },
        select: {
          titulo: true,
        },
      });
      return { success: true, data: event };
    }),
  updateEvent: protectedProcedure
    .input(
      z.object({
        eventId: z.string(),
        fecha: z.date(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.citas.update({
        where: {
          id: input.eventId,
        },
        data: {
          fecha: input.fecha,
        },
      });

      return { success: true };
    }),
});
