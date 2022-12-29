import Layout from "@components/Layout";

import { UsersIcon, CalendarIcon } from "@heroicons/react/24/outline";

import Link from "next/link";
import { useRouter } from "next/router";

const Dashboard = () => {
  const router = useRouter();

  return (
    <Layout>
      <h2 className=" text-2xl font-extrabold text-gray-700 md:text-4xl">
        Panel de Control
      </h2>
      <div className="grid h-full w-full  grid-cols-1  place-items-center gap-4 overflow-visible p-4 md:grid-cols-2">
        <Link
          href="/panel/pacientes"
          className="flex h-5/6 w-5/6 cursor-pointer  flex-col items-center justify-center rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-violet-50 transition-all md:h-1/2 md:w-1/2 md:hover:scale-95"
        >
          <UsersIcon width={80} />
          <p className=" text-2xl font-bold">Pacientes</p>
        </Link>
        <Link
          href="/panel/calendario"
          className="flex h-5/6 w-5/6 cursor-pointer  flex-col items-center justify-center rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-violet-50 transition-all md:h-1/2 md:w-1/2 md:hover:scale-95"
        >
          <CalendarIcon width={80} />
          <p className=" text-2xl font-bold">Calendario</p>
        </Link>
      </div>
    </Layout>
  );
};

export default Dashboard;
