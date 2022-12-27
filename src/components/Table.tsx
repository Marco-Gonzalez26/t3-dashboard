import React from "react";
import { PlusIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { User } from "types/user";
import Loader from "./Loader";
import Link from "next/link";

interface Props {
  users: [];
  isLoading: boolean;
  error: string | undefined;
}

export const Table: React.FC<{
  users: User[] | [];
  isLoading: boolean;
  error: string | undefined;
}> = ({ users }) => {
  return (
    <>
      <div className="my-2 h-full w-full overflow-x-auto sm:-mx-6 lg:-mx-8">
        {/* <Pagination offset={offset} setOffset={setOffSet} /> */}

        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 ">
                <tr className="w-full">
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
              <tbody className=" min-h-full flex-col divide-y divide-gray-200 bg-white">
                {users?.map((user) => (
                  <tr
                    className="transition-all duration-150 hover:bg-slate-100"
                    key={`user-item-${user.id}`}
                  >
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center justify-start ">
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name.firstname}
                          </div>
                          <div className="text-sm capitalize text-gray-500">
                            {user.username}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm text-gray-500">
                        {user.address.city}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className="inline-flex rounded-full  px-2 text-xs font-semibold leading-5 text-gray-500">
                        {user.phone}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {user.id}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium text-blue-700">
                      <button>Editar</button>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium text-gray-700">
                      <button>Detalles</button>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium text-red-700">
                    <button>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
