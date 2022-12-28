import { type NextPage } from "next";
import Head from "next/head";
import { ArrowLongRightIcon } from "@heroicons/react/20/solid";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import Layout from "@components/Layout";

const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>AlwaysPanel</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div
          className="flex h-full w-full flex-col  items-center justify-start
        rounded bg-gradient-to-tr from-blue-50 to-violet-50 md:justify-center"
        >
          <h1 className="mt-10 text-center text-3xl font-bold text-gray-800 md:text-7xl md:mt-0">
            Datos para mejorar tu{" "}
            <span className="ml-2 text-violet-700">trabajo</span>
          </h1>
          <p className="mt-6 p-2 text-center text-xl leading-8 text-gray-600 sm:text-center">
            La mejor manera para brindar un buen servicio es teniendo la mejor
            herramienta
          </p>
          <button className="mt-5  flex items-center rounded-lg bg-indigo-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700 ">
            Iniciar Sesión
            <span className="ml-2 text-indigo-200" aria-hidden="true">
              <ArrowLongRightIcon width={15} />
            </span>
          </button>
          <footer className="absolute bottom-0 p-5 text-lg md-text-xl">
            Creado con ❤️ por <span className="font-mono">always.dev</span>
          </footer>
        </div>
      </Layout>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
