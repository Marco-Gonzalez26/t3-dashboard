import { z } from "zod";

import { router, protectedProcedure } from "../trpc";
import { prisma } from "../../db/client";

export const userRouter = router({
  getAll: protectedProcedure
    .input(
      z
        .object({
          offset: z.number().optional(),
          query: z.string().optional(),
        })
        .optional()
    )
    .query(async ({ ctx, input }) => {
      const count = await ctx.prisma.paciente.count({
        where: {
          userId: ctx.session.user.id,
        },
      });
      const patients = await ctx.prisma.paciente.findMany({
        take: 10,
        skip: input?.offset,
        where: {
          userId: ctx.session.user.id,

          OR: [
            {
              nombre: {
                contains: input?.query?.toLocaleLowerCase(),
              },
            },
          ],
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
      return { patients, count };
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
  create: protectedProcedure
    .input(
      z.object({
        nombre: z.string(),
        edad: z.number(),
        email: z.string(),
        telefono: z.string(),
        nacimiento: z.string(),
        direccion: z.string(),
        peso: z.number(),
        talla: z.string(),
        pa: z.string(),
        fc: z.string(),
        satO2: z.string(),
        promPa: z.string().optional().nullable(),
        promFc: z.string().optional().nullable(),
        ttoActual: z.string().optional().nullable(),
        primeraCita: z.date().optional().nullable(),
        control: z.any(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const paciente = await prisma.paciente.create({
        data: {
          nombre: input.nombre.toLocaleLowerCase(),
          edad: input.edad,
          telefono: input.telefono.toLocaleLowerCase(),
          email: input.email.toLowerCase(),
          nacimiento: input.nacimiento.toLocaleLowerCase(),
          direccion: input.direccion.toLocaleLowerCase(),
          talla: input.talla.toLocaleLowerCase(),
          peso: input.peso,
          pa: input.pa.toLocaleLowerCase(),
          fc: input.fc.toLocaleLowerCase(),
          satO2: input.satO2.toLocaleLowerCase(),
          promPa: input.promPa?.toLocaleLowerCase(),
          promFc: input.promFc?.toLocaleLowerCase(),
          ttoActual: input.ttoActual?.toLocaleLowerCase(),
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
  update: protectedProcedure
    .input(
      z.object({
        id: z.any(),
        nombre: z.string().optional(),
        edad: z.number().optional(),
        telefono: z.string().optional(),
        nacimiento: z.string().optional(),
        direccion: z.string().optional(),
        peso: z.number().optional(),
        talla: z.string().optional(),
        pa: z.string().optional(),
        fc: z.string().optional(),
        satO2: z.string().optional(),
        promPa: z.string().optional().nullable(),
        promFc: z.string().optional().nullable(),
        ttoActual: z.string().optional().nullable(),
        primeraCita: z.date().optional().nullable(),
        control: z.date().optional().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const updatedPatient = await ctx.prisma.paciente.update({
        where: {
          id: input.id,
        },
        data: {
          nombre: input.nombre?.toLocaleLowerCase(),
          edad: input.edad,
          telefono: input.telefono?.toLocaleLowerCase(),
          nacimiento: input.nacimiento?.toLocaleLowerCase(),
          direccion: input.direccion?.toLocaleLowerCase(),
          talla: input.talla?.toLocaleLowerCase(),
          peso: input.peso,
          pa: input.pa?.toLocaleLowerCase(),
          fc: input.fc?.toLocaleLowerCase(),
          satO2: input.satO2?.toLocaleLowerCase(),
          promPa: input.promPa?.toLocaleLowerCase(),
          promFc: input.promFc?.toLocaleLowerCase(),
          ttoActual: input.ttoActual?.toLocaleLowerCase(),
          primeraCita: input.primeraCita?.toISOString(),
          control: input.control?.toISOString(),
        },
        select: {
          nombre: true,
          id: true,
        },
      });

      return { success: true, updatedPatient };
    }),
  delete: protectedProcedure.input(z.any()).mutation(async ({ ctx, input }) => {
    return await ctx.prisma.paciente.delete({
      where: {
        id: input,
      },
    });
  }),
});
