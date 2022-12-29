import Head from "next/head";
import React from "react";
import NavBar from "./NavBar";

interface Props {
  children: JSX.Element;
}

const AppLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>AlwaysPanel | Mantén el orden de tus pacientes</title>
      </Head>
      <main className="flex min-h-screen gap-5  bg-gray-100 p-4 md:flex-col md:p-6">
        <NavBar />
        {children}
      </main>
    </>
  );
};

export default AppLayout;
