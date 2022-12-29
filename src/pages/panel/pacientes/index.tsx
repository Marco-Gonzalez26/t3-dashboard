import Layout from "@components/Layout";
import Loader from "@components/Loader";
import { Table } from "@components/Table";
import { trpc } from "@utils/trpc";

function Pacientes() {
  const { data, isLoading, error } = trpc.users.getAll.useQuery();
  const createPatient = trpc.users.create.useMutation()

  createPatient.mutate({})
  console.log(data)
  return (
    <Layout>
      <h2 className=" mb-4 text-2xl font-extrabold text-gray-700 md:text-4xl">
        Pacientes
      </h2>
      {isLoading ? (
        <div className="flex h-full items-center justify-center">
          <Loader />
        </div>
      ) : (
        <Table users={[]} isLoading={isLoading} error={error?.message} />
      )}
    </Layout>
  );
}

export default Pacientes;
