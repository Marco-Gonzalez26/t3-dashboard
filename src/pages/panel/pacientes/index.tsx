import Layout from "@components/Layout";
import Loader from "@components/Loader";
import { Table } from "@components/Table";
import { trpc } from "@utils/trpc";

function Pacientes() {
  const { data, isLoading, error } = trpc.users.getAll.useQuery();

  return (
    <Layout>
      <h2 className=" mb-4 text-2xl font-extrabold text-gray-700 md:text-4xl">
        Pacientes
      </h2>
      {isLoading ? (
        <div className="h-full flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <Table users={data} isLoading={isLoading} error={error?.message} />
      )}
    </Layout>
  );
}

export default Pacientes;
