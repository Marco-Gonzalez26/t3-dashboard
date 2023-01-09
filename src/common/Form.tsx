import React, { useRef, useState } from "react";
import { trpc } from "@utils/trpc";
import type { Paciente, PacienteFromDB } from "../types/user";
import { useForm, Resolver } from "react-hook-form";

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

const Form: React.FC<{
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setPatients: React.Dispatch<
    React.SetStateAction<PacienteFromDB[] | undefined>
  >;
}> = ({ setOpen, setPatients, setOpenDialog }) => {
  const { refetch } = trpc.users.getAll.useQuery({});
  const queryKey = trpc.users.getAll.useQuery.name;
  const createPatientMutation = trpc.users.create.useMutation();
  const [checked, setChecked] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Paciente>({ resolver });

  const onSubmit = handleSubmit(async (data) => {
    const firstAppointmentDate = new Date(data.primeraCita!);
    const controlDate = new Date(data.control!);
    await createPatientMutation.mutate(
      {
        nombre: data.nombre,
        edad: Number(data.edad),
        direccion: data.direccion,
        email: data.email,
        nacimiento: data.nacimiento,
        telefono: data.telefono,
        talla: data.talla,
        peso: Number(data.peso),
        fc: data.fc,
        pa: data.pa,
        satO2: data.satO2,
        ttoActual: data.ttoActual,
        primeraCita: firstAppointmentDate,
        control: controlDate.toISOString(),
        promFc: data.promFc,
        promPa: data.promPa,
      },

      {
        onSettled(data) {
          if (data) {
            const { paciente } = data;
            setPatients((prevPatients) => {
              const prev: PacienteFromDB[] = prevPatients || [];

              return [...prev, paciente];
            });

            setOpen(false);
            console.log("Paciente agregado exitosamente!");

            setOpenDialog(true);
          }

          refetch({ exact: true, queryKey: [queryKey] });
        },
      }
    );
  });

  const onCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };
  return (
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
                      type="text"
                      id="name"
                      autoComplete="given-name"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                      type="number"
                      inputMode="numeric"
                      id="age"
                      autoComplete="edad"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                      type="text"
                      {...register("nacimiento")}
                      id="nacimiento"
                      autoComplete="edad"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                    <small className="text-gray-500">
                      {" "}
                      Ejemplo: 26/06/2002
                    </small>
                  </div>
                  <div className="col-span-6 sm:col-span-2">
                    <label
                      htmlFor="height"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      {...register("email")}
                      id="height"
                      inputMode="email"
                      autoComplete="email"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                      type="number"
                      {...register("peso")}
                      id="weight"
                      inputMode="numeric"
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
                      type="text"
                      {...register("direccion")}
                      id="address"
                      autoComplete="address"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                      type="tel"
                      {...register("telefono")}
                      id="tel"
                      inputMode="tel"
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
                      {...register("ttoActual")}
                      id="tratamiento"
                      required
                      className="mt-1 block w-full resize-none rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                      type="date"
                      {...register("primeraCita")}
                      id="primera-cita"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-1 lg:col-span-2">
                    <label
                      htmlFor="control"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Control
                    </label>
                    <input
                      type="date"
                      {...register("control")}
                      id="control"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div
                    className={` col-span-6 opacity-0 sm:col-span-1 lg:col-span-2 ${
                      checked ? "opacity-100" : ""
                    } transition-all`}
                  >
                    <label
                      htmlFor="promPa"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Promedio de Presión Arterial
                    </label>
                    <input
                      type="text"
                      {...register("promPa")}
                      id="promPa"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div
                    className={` col-span-6 opacity-0 sm:col-span-3 lg:col-span-2 ${
                      checked ? "opacity-100" : ""
                    } transition-all`}
                  >
                    <label
                      htmlFor="promFc"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Promedio de Frecuencia cardíaca
                    </label>
                    <input
                      type="text"
                      {...register("promFc")}
                      id="promFc"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="col-span-6 items-center sm:col-span-3 lg:col-span-2">
                    <input
                      type="checkbox"
                      id="checkbox-prom"
                      className="mt-1 mr-2 h-5 w-5 rounded-md border-gray-700  shadow-sm sm:text-sm"
                      onChange={onCheckBoxChange}
                    />
                    <label
                      htmlFor="checkbox-prom"
                      className=" text-sm font-medium text-gray-700"
                    >
                      ¿Se necesita promedio?
                    </label>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-500"
                  disabled={createPatientMutation.isLoading}
                >
                  Guardar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
