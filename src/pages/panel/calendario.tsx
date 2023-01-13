import Layout from "@components/Layout";
import React, { useEffect, useState } from "react";

import CalendarComponent from "@components/CalendarComponent";


const Calendario = () => {
  const [events, setEvents] = useState([]);
  
  return (
    <Layout>
      <h2 className="mb-10  text-center text-3xl font-extrabold text-gray-700 md:text-5xl">
        Calendario
      </h2>
      <CalendarComponent />
    </Layout>
  );
};

export default Calendario;
