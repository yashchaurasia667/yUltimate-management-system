"use client";
import { MdCalendarToday, MdLocationOn, MdPeople, MdBusiness } from "react-icons/md";
import { useParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";

interface details {
  title: string;
  description: string;
  organizer: string;
  banner: string;
  date: string;
  venue: string;
  type: string;
}

const Page = () => {
  const [error, setError] = useState("");
  const [eventDetails, setEventDetails] = useState<details | undefined>(undefined);

  const params = useParams<{ id: string }>();

  useEffect(() => {
    const getDetails = async () => {
      const id = params.id;
      const data = await axios.get(`/api/getEventDetails?id=${id}`);
      if (data.status !== 200) {
        setError(data.data.message);
        console.error("Something went wrong: ", data.data.message);
      }
      console.log(data.data.message);

      setEventDetails(data.data.message);
    };
    if (params.id) {
      getDetails();
    }
  }, [params]);

  return (
    <div className="min-h-screen">
      <section className="w-full h-80 sm:h-96 relative">
        {/* <Image src={"https://www.mandatory.gg/wp-content/uploads/mandatory-hollow-knight-silksong-date-sortie.jpg"} alt={title} fill /> */}
        <img src={eventDetails?.banner} alt="Event Banner" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </section>

      <main className="max-w-4xl mx-auto p-6 relative">
        <div className="bg-white rounded-lg shadow-xl p-8 -mt-24 sm:-mt-32">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{eventDetails?.title}</h1>

          <p className="text-lg text-gray-700 mb-6">{eventDetails?.description}</p>

          <hr className="my-6" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-start space-x-3">
              <MdCalendarToday className="text-2xl text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800">Date & Time</h3>
                <p className="text-gray-600">{eventDetails?.date}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <MdLocationOn className="text-2xl text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800">Venue</h3>
                <p className="text-gray-600">{eventDetails?.venue}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <MdPeople className="text-2xl text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800">Event Type</h3>
                <p className="text-gray-600">{eventDetails?.type}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <MdBusiness className="text-2xl text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800">Organized By:</h3>
                <p className="text-gray-600">{eventDetails?.organizer}</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button className="bg-blue-600 text-white font-bold py-3 px-10 rounded-full text-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
              Register Now
            </button>
          </div>
        </div>
      </main>

      <footer className="text-center p-6 text-gray-500 mt-8">
        © {new Date().getFullYear()} {eventDetails?.organizer}. All rights reserved.
      </footer>
    </div>
  );
};

export default Page;
