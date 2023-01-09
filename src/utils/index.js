import { gapi } from "gapi-script";

const googleCalendarId = process.env.GOOGLE_CALENDAR_ID;
const apiKey = process.env.GOOGLE_API_KEY;

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const getEvents = async (calendarID, apiKey) => {
  return await function initiate() {
    return gapi.client
      .init({
        apiKey,
      })
      .then(function () {
        return gapi.client.request({
          path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`,
        });
      })

      .then(
        (response) => {
          const events = response.result.items;

          return events;
        },
        function (err) {
          return [false, err];
        }
      );
  }

  gapi.load("client", initiate);
};
