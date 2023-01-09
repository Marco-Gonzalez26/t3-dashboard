import React from "react";
import type { Event } from "types/user";
import { useForm, Resolver } from "react-hook-form";

const resolver: Resolver<Event> = async (values) => {
  return {
    values: values.title ? values : {},
    errors: !values.title
      ? {
          title: {
            type: "required",
            message: "Este campo es requerido.",
          },
        }
      : {},
  };
};

export const AddEventForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Event>({ resolver });

  return (
    <form className="w-60  h-80 flex flex-col items-start justify-center">
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
        {...register("title")}
        required
      />
      <label
        htmlFor="title"
        className="block text-lg font-medium text-gray-700"
      >
        Fecha
      </label>
      <input
        type="datetime-local"
        id="title"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        {...register("fecha")}
        required
      />
      <button
        type="submit"
        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-500 w-full"
      >
        Guardar
      </button>
    </form>
  );
};
