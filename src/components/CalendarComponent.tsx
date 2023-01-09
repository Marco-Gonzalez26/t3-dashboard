import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import daygrid from "@fullcalendar/daygrid";
import esLocale from "@fullcalendar/core/locales/es";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";

const CalendarComponent = ({}) => {
  const [events, setEvents] = useState([
    { title: "event 1", date: "2023-01-02" },
    { title: "event 2", date: "2023-04-02" },
  ]);
  console.log(events[0])
  return (
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
        height={600}
        weekends={false}
        editable={true}
        selectable={true}
        events={events}
        
      />
    </div>
  );
};

export default CalendarComponent;
