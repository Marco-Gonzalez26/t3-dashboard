import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import daygrid from "@fullcalendar/daygrid";
import esLocale from "@fullcalendar/core/locales/es";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { DateSelectArg, EventDropArg } from "@fullcalendar/core";
import { Modal } from "common/Modal";
import { AddEventForm } from "components/AddEventForm";
import type { PacienteFromDB, Event } from "../types/user";
import { trpc } from "@utils/trpc";

const CalendarComponent: React.FC<{
  patients: PacienteFromDB[] | undefined;
  events: Event[] | undefined;
  setEvents: React.Dispatch<React.SetStateAction<Event[] | undefined>>;
}> = ({ patients, events, setEvents }) => {
  const [eventDate, setEventDate] = useState<Date>();
  const [open, setOpen] = useState(false);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    setOpen(true);
    setEventDate(selectInfo.start);
  };

  const updateCalendarMutation = trpc.token.updateEvent.useMutation();
  const { refetch } = trpc.token.getEvents.useQuery();
  const queryName = trpc.token.getEvents.useQuery.name;
  const onEventDrop = (evt: EventDropArg) => {
    if (evt.event) {
      const newEvent = {
        id: evt.event.id,
        titulo: evt.event.title,
        fecha: evt.event.start || new Date(),
        hora: evt.event.extendedProps.hour,
      };
      setEvents((values) =>
        values?.map((value) => (value.id === evt.event.id ? newEvent : value))
      );
    }
    updateCalendarMutation.mutate(
      {
        fecha: evt.event.start!,
        eventId: evt.event.id,
      },
      {
        onSettled(data) {
          data && refetch({ exact: true, queryKey: [queryName] });
        },
      }
    );
  };
  const eventsForCalendar = events?.map((event) => {
    return {
      id: event.id,
      title: event.titulo,
      allDay: false,
      start: event.fecha,
      extendedProps: {
        hour: event.hora,
      },
    };
  });
  return (
    <>
      <div className="w-4/5 font-bold text-gray-700">
        <FullCalendar
          initialView="dayGridMonth"
          locale={esLocale}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          businessHours
          selectMirror={true}
          dayMaxEvents={true}
          plugins={[daygrid, interactionPlugin, timeGridPlugin]}
          height={650}
          select={handleDateSelect}
          editable={true}
          selectable={true}
          events={eventsForCalendar}
          eventDrop={onEventDrop}
        />
      </div>
      <Modal open={open} setOpen={setOpen} title="Añadir Cita">
        <AddEventForm
          eventDate={eventDate}
          patients={patients}
          setOpen={setOpen}
        />
      </Modal>
    </>
  );
};

export default CalendarComponent;
