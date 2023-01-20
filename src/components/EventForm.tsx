import { trpc } from "@utils/trpc";
import React from "react";

import type { Event } from "types/user";

export const EventForm: React.FC<{
  event: Event;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ event, setOpen }) => {
  const { refetch } = trpc.calendar.getEvents.useQuery();

  const getEventsQueryName = trpc.calendar.getEvents.useQuery.name;

  const deleteEventMutation = trpc.calendar.deleteEvent.useMutation();

  const onDeleteButtonClick = async () => {
    if (event.id)
      await deleteEventMutation.mutate(event.id, {
        onSettled(data) {
          if (data) {
            refetch({ exact: true, queryKey: [getEventsQueryName] });
            
            setOpen(false);
          }
        },
      });
  };
  return (
    <div>
     <h2 className=" text-2xl font-bold text-gray-700 text-center">¿Estás seguro/a que quieres eliminar esta cita?</h2> 
      <p className=" text-xl font-bold text-gray-500 text-center">Esta acción no se puede repetir</p> 
      <button
        type="button"
        className="mt-5 inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-gray-500"
        onClick={onDeleteButtonClick}
        disabled={deleteEventMutation.isLoading}
      >
        Eliminar
      </button>
    </div>
  );
};
