import React from "react";
import { GetServerSideProps } from "next";

import Layout from "@components/Layout";
import DescriptionList from "@components/DescriptionList";
import { trpc } from "@utils/trpc";
import { useRouter } from "next/router";

const Pacientes = () => {
  const { query } = useRouter();
  const { data, isLoading, error } = trpc.users.getUserById.useQuery(query?.id);

  return (
    <Layout>
      <h2 className=" mb-4 text-left text-2xl font-extrabold text-gray-700 md:text-4xl">
        Paciente #{data?.id}
      </h2>
      {/* <DescriptionList /> */}
    </Layout>
  );
};

export default Pacientes;
