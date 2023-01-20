import Layout from "@components/Layout";
import React, { useEffect, useState } from "react";

import CalendarComponent from "@components/CalendarComponent";
import { trpc } from "@utils/trpc";
import Loader from "@components/Loader";
import { PacienteFromDB, Event } from "types/user";

const Calendario = () => {
  const [events, setEvents] = useState<Event[] | undefined>([]);

  const { data, isLoading } = trpc.users.getAll.useQuery({
    offset: 0,
    query: "",
  });
  const {
    data: eventsData,
    isLoading: eventsLoading,
    error: eventsError,
  } = trpc.calendar.getEvents.useQuery();

  useEffect(() => {
    if (!eventsLoading) {
      setEvents(eventsData?.events);
    }
  }, [eventsData]);
  return (
    <Layout>
      <h2 className="mb-10  text-center text-3xl font-extrabold text-gray-700 md:text-5xl">
        Calendario
      </h2>
      {!isLoading ? (
        <CalendarComponent
          patients={data?.patients}
          events={events}
          setEvents={setEvents}
        />
      ) : (
        <Loader text="Obteniendo Citas" />
      )}
    </Layout>
  );
};

export default Calendario;
