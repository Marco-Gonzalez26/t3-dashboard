import { z } from "zod";

import { router, protectedProcedure } from "../trpc";
import { prisma } from "../../db/client";

export const userRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.paciente.findMany({
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
  }),
  getUserById: protectedProcedure.input(z.any()).query(async ({ctx, input}) => {
    return await ctx.prisma.paciente.findFirst({
      where: {
        userId: ctx.session.user.id,
        id: input
      }
    })
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
        promPa: z.string().optional(),
        promFc: z.string().optional(),
        ttoActual: z.string().optional(),
        primeraCita: z.string().optional(),
        control: z.string().optional(),
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
    })
});
