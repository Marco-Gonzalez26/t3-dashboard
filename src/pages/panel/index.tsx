import { UsersIcon, CalendarIcon } from "@heroicons/react/24/outline";

import Link from "next/link";

const Dashboard = () => {
  return (
    <section className=" flex h-screen w-full flex-col items-center justify-center overflow-y-hidden  rounded-lg bg-white p-4 shadow-sm shadow-white md:p-8">
      <h2 className=" text-2xl font-extrabold text-gray-700 md:text-4xl">
        Panel de Control
      </h2>
      <div className="grid h-full w-full  grid-cols-1  place-items-center gap-4 overflow-visible p-4 md:grid-cols-2">
        <Link
          href="/panel/pacientes"
          className="flex h-full w-full cursor-pointer  flex-col items-center justify-center rounded-xl bg-gradient-to-r from-cyan-600 to-emerald-500 text-violet-50 transition-all md:h-1/2 md:w-1/2 md:hover:scale-95"
        >
          <UsersIcon width={80} />
          <p className=" text-2xl font-bold">Pacientes</p>
        </Link>
        <Link
          href="/panel/calendario"
          className="flex h-full w-full cursor-pointer  flex-col items-center justify-center rounded-xl bg-gradient-to-r from-pink-500 to-violet-600 text-violet-50 transition-all md:h-1/2 md:w-1/2 md:hover:scale-95"
        >
          <CalendarIcon width={80} />
          <p className=" text-2xl font-bold">Calendario</p>
        </Link>
      </div>
    </section>
  );
};

export default Dashboard;
