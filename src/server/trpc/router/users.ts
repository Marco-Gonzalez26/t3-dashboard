import { z } from "zod";

import { router, protectedProcedure } from "../trpc";
import { prisma } from "../../db/client";

export const userRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.paciente.findMany();
  }),
  create: protectedProcedure
    .input(
      z.object({
        nombre: z.string(),
        edad: z.string(),
        nacimiento: z.string(),
        direccion: z.string(),
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
    .mutation(async ({ input }) => {
      const paciente = prisma.paciente.create({
        data: {
          nombre: input.nombre,
          edad: input.edad,
          nacimiento: input.edad,
          direccion: input.direccion,
          talla: input.talla,
          pa: input.pa,
          fc: input.fc,
          satO2: input.satO2,
          promPa: input.promPa,
          promFc: input.promFc,
          ttoActual: input.ttoActual,
          primeraCita: input.primeraCita,
          control: input.control,
        },
      });

      return { success: true, paciente: paciente };
    }),
});
