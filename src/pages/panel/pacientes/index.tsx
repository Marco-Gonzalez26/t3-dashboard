import { useEffect, useState } from "react";
import { UserPlusIcon } from "@heroicons/react/24/outline";

import { trpc } from "@utils/trpc";

import Layout from "@components/Layout";
import Loader from "@components/Loader";
import Form from "common/Form";
import { Modal } from "common/Modal";
import { Table } from "@components/Table";
import type { PacienteFromDB } from "types/user";

function Pacientes() {
  const [open, setOpen] = useState<boolean>(false);
  const [patients, setPatients] = useState<PacienteFromDB[] | undefined>([]);
  const { data, isLoading, error, refetch } = trpc.users.getAll.useQuery();
  const queryName = trpc.users.getAll.useQuery.name;
  

  useEffect(() => {
    refetch({ queryKey: [queryName] }).then(() => {
      setPatients(data);
      console.log("re-fetched");
    });
  }, [patients, data]);

  return (
    <Layout>
      {isLoading ? (
        <div className="flex h-screen w-full items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          <h2 className=" mb-4 text-3xl font-extrabold text-gray-700 md:text-4xl">
            Pacientes
          </h2>
          <span className="flex w-4/5 items-center justify-end sm:ml-3">
            <button
              type="button"
              className="inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              onClick={() => setOpen(!open)}
            >
              <UserPlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Añadir Paciente
            </button>
          </span>

          <Table
            patients={patients}
            isLoading={isLoading}
            error={error?.message}
          />
        </>
      )}
      <Modal open={open} setOpen={setOpen} title="Añade un paciente">
        <Form setOpen={setOpen} setPatients={setPatients} />
      </Modal>
    </Layout>
  );
}

export default Pacientes;
