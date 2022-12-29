import Layout from "@components/Layout";
import Loader from "@components/Loader";
import { Table } from "@components/Table";
import { PlusIcon } from "@heroicons/react/24/outline";
import { trpc } from "@utils/trpc";
import Form from "common/Form";
import { Modal } from "common/Modal";
import { useState } from "react";

function Pacientes() {
  const [open, setOpen] = useState<boolean>(false);
  const { data, isLoading, error } = trpc.users.getAll.useQuery();
  const createPatient = trpc.users.create.useMutation();

  console.log(data);
  return (
    <Layout>
      <h2 className=" mb-4 text-2xl font-extrabold text-gray-700 md:text-4xl">
        Pacientes
      </h2>
      <span className="sm:ml-3">
        <button
          type="button"
          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => setOpen(!open)}
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Add Product
        </button>
      </span>
      {isLoading ? (
        <div className="flex h-full items-center justify-center">
          <Loader />
        </div>
      ) : (
        <Table users={[]} isLoading={isLoading} error={error?.message} />
      )}
      <Modal open={open} setOpen={setOpen} title="Añade un paciente">
        <Form />
      </Modal>
    </Layout>
  );
}

export default Pacientes;
