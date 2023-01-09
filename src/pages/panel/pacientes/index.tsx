import { useEffect, useState } from "react";
import { ArrowLeftIcon, UserPlusIcon } from "@heroicons/react/24/outline";

import { trpc } from "@utils/trpc";

import Layout from "@components/Layout";
import Loader from "@components/Loader";
import Form from "common/Form";
import { Modal } from "common/Modal";

import { Table } from "@components/Table";
import type { PacienteFromDB } from "types/user";
import { Pagination } from "@components/Pagination";
import { useRouter } from "next/router";

function Pacientes() {
  const [open, setOpen] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [patients, setPatients] = useState<PacienteFromDB[] | undefined>([]);
  const [offset, setOffset] = useState<number>(0);
  const [query, setQuery] = useState<string>("");
  const { push } = useRouter();
  const { data, isLoading, error, refetch } = trpc.users.getAll.useQuery({
    offset,
    query,
  });
  const queryName = trpc.users.getAll.useQuery.name;

  const patientLength = data?.count;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setQuery(value);
  };

  useEffect(() => {
    refetch({ queryKey: [queryName] }).then(() => {
      setPatients(data?.patients);
    });
  }, [patients, data]);

  return (
    <Layout>
      <h2 className=" mb-4 text-left text-3xl font-extrabold text-gray-700 md:text-4xl">
        Pacientes
      </h2>
      <div className="flex w-full flex-col justify-between md:flex-row-reverse ">
        <span className="flex items-center justify-end sm:ml-3 flex-row-reverse gap-4 mb-5">
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            onClick={() => setOpen(!open)}
          >
            <UserPlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Añadir Paciente
          </button>
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            onClick={() => push("/panel")}
          >
            <ArrowLeftIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Atrás
          </button>
        </span>
        <form>
          <label
            htmlFor="buscar"
            className=" text-sm font-medium text-gray-500"
          >
            Buscar Pacientes
          </label>
          <input
            type="text"
            id="buscar"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-xs"
            onChange={onChange}
            placeholder="Buscar por nombre..."
          />
        </form>
      </div>
      <Pagination
        setOffset={setOffset}
        offset={offset}
        isPatientsLoading={isLoading}
        patientLength={patientLength}
      />
      {isLoading ? (
        <div className="mt-10 flex h-full w-full items-center justify-center">
          <Loader text="Obteniendo Pacientes" />
        </div>
      ) : (
        <Table
          patients={patients}
          isLoading={isLoading}
          error={error?.message}
          setPatients={setPatients}
        />
      )}
      <Modal open={open} setOpen={setOpen} title="Añade un paciente">
        <Form
          setOpen={setOpen}
          setPatients={setPatients}
          setOpenDialog={setOpenDialog}
        />
      </Modal>
    </Layout>
  );
}

export default Pacientes;
