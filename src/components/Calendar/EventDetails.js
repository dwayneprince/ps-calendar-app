import React from 'react';
import { formatDate } from '../../utils';

const EventDetails = ({ selectedEvent }) => {
  return (
    <div className={`grid  gap-4 col-span-7`}>
      <div className="relative">
        <img
          src={`${process.env.PUBLIC_URL}/images/${selectedEvent.imageFilenameFull}.webp`}
          alt={selectedEvent.title}
          className="w-full h-full object-cover rounded"
        />
        <div className="absolute top-0 left-0 w-1/2 h-full flex flex-col justify-center pl-12">
          <h3 className="text-4xl text-white mb-2 font-semibold">
            {selectedEvent.title}
          </h3>
          <p className="text-white">{selectedEvent.summary}</p>

          <p className="text-white my-5 font-bold">
            Available {formatDate(selectedEvent?.launchDate)}
          </p>
          <div>
            <a
              href={selectedEvent.learnMoreLink}
              className="bg-blue-500 text-white  py-3 px-5 rounded-3xl text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn More
            </a>
            <a
              href={selectedEvent.purchaseLink}
              className="ml-4 bg-orange-600  text-white py-3 px-5 rounded-3xl text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pre Order Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
