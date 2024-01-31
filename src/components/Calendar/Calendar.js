import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import EventDetails from './EventDetails';
import useCalendar from '../../hooks/useCalendar';

const Calendar = () => {
  const { year: urlYear, month: urlMonth } = useParams();

  const initialYear = urlYear
    ? parseInt(urlYear, 10)
    : new Date().getFullYear();
  const initialMonth = urlMonth
    ? parseInt(urlMonth, 10)
    : new Date().getMonth() + 1;

  const { year, month, goToPreviousMonth, goToNextMonth, updateUrl } =
    useCalendar(initialYear, initialMonth);

  // const apiUrl = `${process.env.PUBLIC_URL}/events.json`;
  const url = 'https://amock.io/api/dwayneprinc/game-events';
  const { data: eventsData, loading, error } = useFetch(url);

  const [selectedEvent, setSelectedEvent] = useState(null);

  const dayNames = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(2024, 0, index + 1); // Use any date for reference
    return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
  });

  const handleEventClick = (event) => {
    if (event) {
      const dateObject = new Date(event.launchDate);

      const year = dateObject.getFullYear();
      const month = dateObject.getMonth() + 1;

      updateUrl(year, month);
    }
    setSelectedEvent(event);
  };

  const handleCloseDetails = () => {
    setSelectedEvent(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!eventsData || !Array.isArray(eventsData)) {
    return <div>No events available.</div>;
  }

  const events = eventsData;

  const daysInMonth = new Date(year, month, 0).getDate();
  const daysWithEvents = Array.from(
    { length: daysInMonth },
    (_, index) => index + 1
  );

  return (
    <div className="container mx-auto">
      <div className="border-b-2 border-b-gray-400  p-4 mb-4 flex justify-between items-center">
        <button
          className="text-3xl  py-2 px-4 rounded"
          onClick={goToPreviousMonth}
        >
          &lt;
        </button>
        <h2 className="text-lg font-bold">{`${new Date(
          `${urlYear}-${urlMonth}-01`
        ).toLocaleString('en-US', { month: 'long' })} ${urlYear}`}</h2>
        <button className="text-3xl  py-2 px-4 rounded" onClick={goToNextMonth}>
          &gt;
        </button>
      </div>

      <div className="grid grid-cols-7 gap-4">
        {dayNames.map((day) => (
          <div key={day} className="text-center font-bold">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-4">
        {daysWithEvents.map((day, index) => {
          const eventsForDay = events.filter((event) => {
            const eventDate = new Date(event.launchDate);
            return (
              eventDate.getDate() === day &&
              eventDate.getMonth() + 1 === month && // Months are zero-based, so add 1
              eventDate.getFullYear() === year
            );
          });

          const eventImage =
            eventsForDay.length > 0
              ? `${process.env.PUBLIC_URL}/images/${eventsForDay[0].imageFilenameFull}.webp`
              : null;

          if (index === 14 && selectedEvent) {
            return (
              <EventDetails
                key={day}
                selectedEvent={selectedEvent}
                onCloseDetails={handleCloseDetails}
              />
            );
          }

          return (
            <div
              key={day}
              className={`relative  shadow-lg  ${
                eventsForDay.length > 0
                  ? 'border-2 border-blue-500 cursor-pointer'
                  : ''
              }`}
              onClick={() => handleEventClick(eventsForDay[0])}
              style={{ aspectRatio: '1/1' }}
            >
              {eventImage && (
                <img
                  src={eventImage}
                  alt={`Event on day ${day}`}
                  className="w-full h-full object-cover"
                />
              )}
              <div
                className={`absolute top-2 right-2 ${
                  eventImage && 'bg-blue-500 text-white'
                }  py-1 px-2 font-semibold rounded-full`}
              >
                {day}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
