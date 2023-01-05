import { useRouter } from "next/router";

import { trpc } from "@utils/trpc";

import Loader from "@components/Loader";
import Layout from "@components/Layout";
import DescriptionList from "@components/DescriptionList";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";

const Pacientes = () => {
  const { query, push } = useRouter();
  const { data, isLoading, error } = trpc.users.getUserById.useQuery(query?.id);

  return (
    <Layout>
      {isLoading ? (
        <div className="flex h-screen w-screen items-center justify-center">
          <Loader text="Obteniendo Paciente"/>
        </div>
      ) : (
        <>

          <span className="flex w-[90%] items-center justify-start sm:ml-3 ">
            <button
              type="button"
              className="inline-flex items-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              onClick={() => push("/panel/pacientes")}
            >
              <ArrowLeftIcon
                className="-ml-1 mr-2 h-5 w-5"
                aria-hidden="true"
              />
              Atrás
            </button>
          </span>
          <DescriptionList patient={data} />
        </>
      )}
    </Layout>
  );
};

export default Pacientes;
