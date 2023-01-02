import React from "react";

import type { PacienteFromDB } from "types/user";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { trpc } from "@utils/trpc";

export const Table: React.FC<{
  patients: PacienteFromDB[] | undefined;
  isLoading: boolean;
  error: string | undefined;
}> = ({ patients }) => {
  const deletePatient = trpc.users.delete.useMutation();
  const queryName = trpc.users.getAll.useQuery.name;
  const { refetch } = trpc.users.getAll.useQuery();

  return (
    <>
      <div className="my-2 h-full w-full overflow-hidden sm:-mx-6 lg:-mx-8">


        <div className="  min-w-screen min-h-full py-2  sm:px-6 lg:px-8">
          {patients?.length === 0 ? (
            <div className="grid h-screen  w-full items-start justify-center">
              <h1 className="align-middle text-4xl font-bold text-gray-400 ">
                No hay pacientes :(
              </h1>
            </div>
          ) : (
            <div className="min-w-screen  flex overflow-x-auto border-b border-gray-200 shadow sm:rounded-lg">
              <table className="min-h-full min-w-full divide-y divide-gray-200">
                <thead className="sticky top-0 bg-gray-50">
                  <tr className="w-full ">
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 "
                    >
                      Nombre
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Dirección
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Número
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Id
                    </th>
                  </tr>
                </thead>
                <tbody className=" min-h-screen flex-col divide-y divide-gray-200 bg-white capitalize">
                  {patients?.map((user) => (
                    <tr
                      className="transition-all duration-150 hover:bg-slate-100"
                      key={`user-item-${user.id}`}
                    >
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center justify-start ">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.nombre}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-500">
                          {user.direccion}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span className="inline-flex rounded-full  px-2 text-xs font-semibold leading-5 text-gray-500">
                          {user.telefono}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {user.id}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium text-blue-700">
                        <button>Editar</button>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium text-gray-700">
                        <Link href={`pacientes/${user.id}`}>Detalles</Link>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium text-red-700">
                        <button
                          onClick={() => {
                            deletePatient.mutate(user.id, {
                              onSuccess() {
                                refetch({ exact: true, queryKey: [queryName] });
                                console.log(
                                  "paciente  " +
                                    user.id +
                                    "eliminado correctamente"
                                );
                              },
                            });
                          }}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
