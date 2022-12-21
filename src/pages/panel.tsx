import Layout from "@components/Layout";

import { UsersIcon, CalendarIcon } from "@heroicons/react/24/outline";

const Dashboard = () => {
  return (
    <Layout>
      <>
        <h1 className="mb-4 text-2xl font-extrabold text-gray-700 md:text-4xl">
          Panel de Control
        </h1>
        <div className="grid h-full w-full  grid-cols-1  place-items-center gap-4 overflow-visible p-4 md:grid-cols-2">
          <div className="flex h-5/6 w-5/6 md:h-1/2  md:w-1/2 cursor-pointer flex-col items-center justify-center rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-violet-50 transition-all md:hover:scale-95">
            <UsersIcon width={80} />
            <p className=" text-2xl font-bold">Pacientes</p>
          </div>
          <div className="flex h-5/6 w-5/6 md:h-1/2  md:w-1/2 cursor-pointer flex-col items-center justify-center rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-violet-50 transition-all md:hover:scale-95">
            <CalendarIcon width={80} />
            <p className=" text-2xl font-bold">Calendario</p>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default Dashboard;
