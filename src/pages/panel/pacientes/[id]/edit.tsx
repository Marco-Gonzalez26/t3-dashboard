import React, { useState } from "react";
import { useRouter } from "next/router";

import Layout from "@components/Layout";

import { useForm, Resolver } from "react-hook-form";
import type { Paciente } from "types/user";
import { trpc } from "@utils/trpc";
import { DialogNotification } from "common/DialogNotification";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Loader from "@components/Loader";

const resolver: Resolver<Paciente> = async (values) => {
  return {
    values: values.nombre ? values : {},
    errors: !values.nombre
      ? {
          nombre: {
            type: "required",
            message: "Este campo es requerido.",
          },
        }
      : {},
  };
};

function Edit() {
  const { query, push } = useRouter();
  const { data, isLoading, error } = trpc.users.getUserById.useQuery(query?.id);
  const { refetch } = trpc.users.getAll.useQuery();
  const queryKey = trpc.users.getAll.useQuery.name;
  const [open, setOpen] = useState(false);
  const updatePatientMutation = trpc.users.update.useMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Paciente>({ resolver });

  const onSubmit = handleSubmit(async (mutateData) => {
    await updatePatientMutation.mutate(
      {
        id: query?.id,
        nombre: mutateData?.nombre || data?.nombre,
        edad: mutateData?.edad || data?.edad,
        nacimiento: mutateData?.nacimiento || data?.nacimiento,
        talla: mutateData?.talla || data?.talla,
        peso: mutateData?.peso || data?.peso,
        telefono: mutateData?.telefono || data?.telefono,
        direccion: mutateData?.direccion || data?.direccion,
        fc: mutateData?.fc || data?.fc,
        pa: mutateData?.pa || data?.pa,
        control: mutateData?.control || data?.control,
        primeraCita: mutateData?.primeraCita || data?.primeraCita,
        ttoActual: mutateData?.ttoActual || data?.ttoActual,
        satO2: mutateData?.satO2 || data?.satO2,
        promPa: mutateData?.promPa || data?.promPa,
        promFc: mutateData?.promFc || data?.promFc,
      },

      {
        onSettled(data) {
          if (data?.updatedPatient) {
            push("/panel/pacientes");
          }
          refetch({ exact: true, queryKey: [queryKey] });
        },
      }
    );
  });
  return (
    <Layout>
      <h2 className=" mb-4 text-left text-3xl font-extrabold text-gray-700 md:text-4xl">
        Editar Paciente
      </h2>
      <span className="flex w-[90%] items-center justify-start sm:ml-3 ">
        <button
          type="button"
          className="inline-flex items-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          onClick={() => push("/panel/pacientes")}
        >
          <ArrowLeftIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Atrás
        </button>
      </span>
      {isLoading ? (
        <div className="flex h-screen w-screen items-center justify-center">
          <Loader text="Obteniendo Información" />
        </div>
      ) : (
        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="mt-5 md:col-span-3 md:mt-0">
              <form onSubmit={onSubmit}>
                <div className="overflow-hidden shadow sm:rounded-md">
                  <div className="bg-white px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-2">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Nombre Completo
                        </label>
                        <input
                          defaultValue={data?.nombre}
                          type="text"
                          id="name"
                          autoComplete="given-name"
                          className="mt-1 block w-full rounded-md border-gray-300 capitalize shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          {...register("nombre")}
                          required
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-1">
                        <label
                          htmlFor="age"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Edad
                        </label>
                        <input
                          defaultValue={data?.edad}
                          type="text"
                          id="age"
                          autoComplete="edad"
                          className="mt-1 block w-full rounded-md border-gray-300 capitalize shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          {...register("edad")}
                          required
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-1">
                        <label
                          htmlFor="nacimiento"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Fecha de Nacimiento
                        </label>

                        <input
                          defaultValue={data?.nacimiento}
                          type="text"
                          {...register("nacimiento")}
                          id="nacimiento"
                          autoComplete="edad"
                          className="mt-1 block w-full rounded-md border-gray-300 capitalize shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          required
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-1">
                        <label
                          htmlFor="height"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Talla
                        </label>
                        <input
                          defaultValue={data?.talla}
                          type="text"
                          {...register("talla")}
                          id="height"
                          autoComplete="talla"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          required
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-1">
                        <label
                          htmlFor="weight"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Peso
                        </label>
                        <input
                          defaultValue={data?.peso}
                          type="text"
                          {...register("peso")}
                          id="weight"
                          autoComplete="peso"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          required
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-2">
                        <label
                          htmlFor="address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Dirección
                        </label>
                        <input
                          defaultValue={data?.direccion}
                          type="text"
                          {...register("direccion")}
                          id="address"
                          autoComplete="address"
                          className="mt-1 block w-full rounded-md border-gray-300 capitalize shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          required
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-1">
                        <label
                          htmlFor="tel"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Teléfono
                        </label>
                        <input
                          defaultValue={data?.telefono}
                          type="text"
                          {...register("telefono")}
                          id="tel"
                          autoComplete="tel"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          required
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-1">
                        <label
                          htmlFor="pa"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Presión Arterial
                        </label>
                        <input
                          defaultValue={data?.pa}
                          type="text"
                          {...register("pa")}
                          id="pa"
                          autoComplete="pa"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          required
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-1">
                        <label
                          htmlFor="fc"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Frecuencia cardiaca
                        </label>
                        <input
                          defaultValue={data?.fc}
                          type="text"
                          {...register("fc")}
                          id="fc"
                          autoComplete="fc"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          required
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-1">
                        <label
                          htmlFor="satO2"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Saturación de Oxígeno
                        </label>
                        <input
                          defaultValue={data?.satO2}
                          type="text"
                          {...register("satO2")}
                          id="satO2"
                          autoComplete="satO2"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          required
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-2">
                        <label
                          htmlFor="tratamiento"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Tratamiento Actual
                        </label>
                        <textarea
                          defaultValue={
                            data?.ttoActual
                              ? data?.ttoActual
                              : "No hay información"
                          }
                          {...register("ttoActual")}
                          id="tratamiento"
                          className="mt-1 block w-full resize-none rounded-md border-gray-300 capitalize shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-4 lg:col-span-2">
                        <label
                          htmlFor="primera-cita"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Primera Cita
                        </label>
                        <input
                          defaultValue={
                            data?.primeraCita
                              ? data?.primeraCita
                              : "No hay información"
                          }
                          type="text"
                          {...register("primeraCita")}
                          id="primera-cita"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label
                          htmlFor="control"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Control
                        </label>
                        <input
                          defaultValue={
                            data?.control ? data?.control : "No hay información"
                          }
                          type="text"
                          {...register("control")}
                          id="control"
                          autoComplete="address-level1"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm ring-2 
                    ring-indigo-700 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-500"
                      disabled={isLoading}
                    >
                      Guardar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Edit;
