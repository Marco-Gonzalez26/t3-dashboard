import React from "react";
import { GetServerSideProps } from "next";
import { User } from "../../../types/user";
import Layout from "@components/Layout";
import DescriptionList from "@components/DescriptionList";

const Pacientes: React.FC<{ user: User }> = ({ user }) => {
  return (
    <Layout>
      <h2 className=" mb-4 text-left text-2xl font-extrabold text-gray-700 md:text-4xl">
        Paciente #{user.id}
      </h2>
      <DescriptionList user={user} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;

  const res = await fetch(`https://fakestoreapi.com/users/${params?.id}`);
  const data = await res.json();

  return {
    props: {
      user: data,
    }, // will be passed to the page component as props
  };
};

export default Pacientes;
