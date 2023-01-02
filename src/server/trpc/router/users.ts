import { z } from "zod";

import { router, protectedProcedure } from "../trpc";
import { prisma } from "../../db/client";

export const userRouter = router({
  getAll: protectedProcedure
    .input(z.number().optional())
    .query(async ({ ctx, input }) => {
      const count = await ctx.prisma.paciente.count({
        where: {
          userId: ctx.session.user.id,
        },
      });
      const patients = await ctx.prisma.paciente.findMany({
        take: 10,
        skip: input,
        where: {
          userId: ctx.session.user.id,
        },

        orderBy: [
          {
            nombre: "asc",
          },
        ],
        select: {
          nombre: true,
          direccion: true,
          telefono: true,
          id: true,
        },
      });
      return {patients, count}
    }),
  getUserById: protectedProcedure
    .input(z.any())
    .query(async ({ ctx, input }) => {
      ctx.prisma.paciente.count({ where: {} });
      return await ctx.prisma.paciente.findFirst({
        where: {
          userId: ctx.session.user.id,
          id: input,
        },
      });
    }),
  delete: protectedProcedure.input(z.any()).mutation(async ({ ctx, input }) => {
    return await ctx.prisma.paciente.delete({
      where: {
        id: input,
      },
    });
  }),
  create: protectedProcedure
    .input(
      z.object({
        nombre: z.string(),
        edad: z.string(),
        telefono: z.string(),
        nacimiento: z.string(),
        direccion: z.string(),
        peso: z.string(),
        talla: z.string(),
        pa: z.string(),
        fc: z.string(),
        satO2: z.string(),
        promPa: z.string().optional().nullable(),
        promFc: z.string().optional().nullable(),
        ttoActual: z.string().optional().nullable(),
        primeraCita: z.string().optional().nullable(),
        control: z.string().optional().nullable(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const paciente = await prisma.paciente.create({
        data: {
          nombre: input.nombre,
          edad: input.edad,
          telefono: input.telefono,
          nacimiento: input.edad,
          direccion: input.direccion,
          talla: input.talla,
          peso: input.peso,
          pa: input.pa,
          fc: input.fc,
          satO2: input.satO2,
          promPa: input.promPa,
          promFc: input.promFc,
          ttoActual: input.ttoActual,
          primeraCita: input.primeraCita,
          control: input.control,
          userId: ctx.session.user.id,
        },
        select: {
          id: true,
          nombre: true,
          direccion: true,
          telefono: true,
        },
      });

      return await { success: true, paciente: paciente };
    }),
});
