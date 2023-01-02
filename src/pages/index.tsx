import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";


import Layout from "@components/Layout";

import Link from "next/link";


const Home: NextPage = () => {
  const { status } = useSession();

  const router = useRouter();

  if (status === 'authenticated') {
    router.push("/panel");
  }

  return (
    <>
      <Head>
        <title>AlwaysPanel</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div
          className="flex min-h-screen w-full flex-col  items-center justify-start
        rounded bg-gradient-to-tr from-blue-50 to-violet-50 md:justify-center"
        >
          <h1 className="mt-10 text-center text-3xl font-bold text-gray-800 md:mt-0 md:text-7xl">
            Datos para mejorar tu{" "}
            <span className="ml-2 text-violet-700">trabajo</span>
          </h1>
          <p className="mt-6 p-2 text-center text-xl leading-8 text-gray-600 sm:text-center">
            La mejor manera para brindar un buen servicio es teniendo la mejor
            herramienta
          </p>
          <Link
            href="/login"
            className="mt-5  flex items-center rounded-lg bg-indigo-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700 "
          >
            Iniciar Sesión
          </Link>
        </div>
      </Layout>
    </>
  );
};

export default Home;
