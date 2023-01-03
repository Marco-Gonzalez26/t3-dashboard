import React from "react";
import { useRouter } from "next/router";

import Layout from "@components/Layout";

function Edit() {
  const { query } = useRouter();

  return (
    <Layout>
      <h1>Editar paciente {query.id}</h1>
    </Layout>
  );
}

export default Edit;
