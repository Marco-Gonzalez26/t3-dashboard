import React from "react";

import { useForm, Resolver } from "react-hook-form";
import { trpc } from "@utils/trpc";
import type { PacienteFromDB, Event } from "types/user";

const resolver: Resolver<Event> = async (values) => {
  return {
    values: values.titulo ? values : {},
    errors: !values.titulo
      ? {
          title: {
            type: "required",
            message: "Este campo es requerido.",
          },
        }
      : {},
  };
};

export const AddEventForm: React.FC<{
  eventDate?: Date;
  patients: PacienteFromDB[] | undefined;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ eventDate, patients, setOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Event>({ resolver });
  
  const createEvent = trpc.calendar.createEvent.useMutation();
  const { refetch } = trpc.calendar.getEvents.useQuery();
  const queryName = trpc.calendar.getEvents.useQuery.name;
  const onSubmit = handleSubmit(async (data) => {
    let date: Date;
    if (eventDate) {
      date = eventDate;
    }
    createEvent.mutate(
      {
        fecha: date!,
        hora: data.hora!,
        titulo: data.titulo!,
        pacienteId: data.pacienteId,
      },
      {
        onSettled(data) {
          if (data) {
            refetch({ exact: true, queryKey: [queryName] });
            setOpen(false);
          }
        },
        onError(data) {
          console.error(data.message);
        },
      }
    );
  });

  return (
    <form
      className="flex  h-96 w-60 flex-col items-start justify-start"
      onSubmit={onSubmit}
    >
      <label
        htmlFor="title"
        className="block text-lg font-medium text-gray-700"
      >
        Título de la cita
      </label>
      <input
        type="text"
        id="title"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        {...register("titulo")}
        required
      />
      <label
        htmlFor="paciente"
        className="block text-lg font-medium text-gray-700"
      >
        Paciente
      </label>
      <select
        id="paciente"
        className="mt-1 block w-full rounded-md border-gray-300 capitalize shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        {...register("pacienteId")}
      >
        {patients?.map((item) => {
          return (
            <option key={item.id} value={item.id}>
              {item.nombre}
            </option>
          );
        })}
      </select>
      <label
        htmlFor="fecha"
        className="block text-lg font-medium text-gray-700"
      >
        Fecha
      </label>
      <input
        type="date"
        id="fecha"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        {...register("fecha")}
        required
        value={eventDate?.toISOString().substring(0, 10)}
        disabled
      />
      <label
        htmlFor="fecha"
        className="block text-lg font-medium text-gray-700"
      >
        Hora
      </label>
      <input
        type="time"
        id="time"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        {...register("hora")}
        required
      />
      <button
        type="submit"
        className="mt-5 inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-500"
      >
        Guardar
      </button>
    </form>
  );
};
