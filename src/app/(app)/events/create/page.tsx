"use client";

import { useState, ChangeEvent, FormEvent, ReactNode, FC } from "react";
import ButtonDefault from "../../../../components/buttonDefault";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

interface SvgProps {
  className?: string;
}

const FormField: FC<FormFieldProps> = ({ id, label, icon, children }) => (
  <div className="mb-6">
    <label htmlFor={id} className="flex items-center text-lg font-semibold text-gray-700 mb-2">
      {icon}
      <span className="ml-2">{label}</span>
    </label>
    {children}
  </div>
);

const MdCalendarToday: FC<SvgProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={className || "w-6 h-6"}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
    />
  </svg>
);

const MdLocationOn: FC<SvgProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={className || "w-6 h-6"}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
    />
  </svg>
);

const MdPeople: FC<SvgProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={className || "w-6 h-6"}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
    />
  </svg>
);

const MdBusiness: FC<SvgProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={className || "w-6 h-6"}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h6.75m-6.75 3h6.75m-6.75 3h6.75m-6.75 3h6.75M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
    />
  </svg>
);

const MdAccessTime: FC<SvgProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={className || "w-6 h-6"}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

const MdTextFields: FC<SvgProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={className || "w-6 h-6"}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
  </svg>
);

const MdNotes: FC<SvgProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={className || "w-6 h-6"}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
  </svg>
);

// --- Page Component ---

// Define an interface for our form data
interface EventData {
  name: string;
  description: string;
  type: "individual" | "team";
  date: string;
  venue: string;
  time: string;
  organizer: string;
}

// Define props for the helper component
interface FormFieldProps {
  id: string;
  label: string;
  icon: ReactNode;
  children: ReactNode;
}

export default function CreateEventPage() {
  // State to hold all the form data, typed with our interface
  const [eventData, setEventData] = useState<EventData>({
    name: "",
    description: "",
    type: "individual", // Default value
    date: "",
    venue: "",
    time: "",
    organizer: "",
  });

  // Type the event handler
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Handle the 'type' field specifically to ensure it matches the literal type
    if (name === "type") {
      setEventData((prevData) => ({
        ...prevData,
        type: value as "individual" | "team",
      }));
    } else {
      setEventData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Type the form submission handler
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // For now, we'll just log the data to the console.
    // In a real app, you would send this data to your backend or database.
    console.log("Event Data Submitted:", eventData);
    alert("Event created! Check the console for the data.");

    // Optionally, clear the form after submission
    setEventData({
      name: "",
      description: "",
      type: "individual",
      date: "",
      venue: "",
      time: "",
      organizer: "",
    });
  };

  // Helper component for form fields, typed with our props interface
  return (
    <>
      <SignedIn>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
          <main className="w-full max-w-2xl">
            <div className="bg-white rounded-lg shadow-xl p-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 text-center">Create a New Event</h1>

              <form onSubmit={handleSubmit}>
                {/* Event Name */}
                <FormField id="name" label="Event Name" icon={<MdTextFields className="text-blue-600 w-6 h-6" />}>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={eventData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Yultimate Code Conference 2025"
                    required
                  />
                </FormField>

                {/* Description */}
                <FormField id="description" label="Description" icon={<MdNotes className="text-blue-600 w-6 h-6" />}>
                  <textarea
                    id="description"
                    name="description"
                    value={eventData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tell us what your event is about..."
                    required
                  ></textarea>
                </FormField>

                {/* Grid for details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Event Type */}
                  <FormField id="type" label="Event Type" icon={<MdPeople className="text-blue-600 w-6 h-6" />}>
                    <select
                      id="type"
                      name="type"
                      value={eventData.type}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="individual">Individual</option>
                      <option value="team">Team</option>
                    </select>
                  </FormField>

                  {/* Organizer Name */}
                  <FormField id="organizer" label="Organizer" icon={<MdBusiness className="text-blue-600 w-6 h-6" />}>
                    <input
                      type="text"
                      id="organizer"
                      name="organizer"
                      value={eventData.organizer}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., TechGuild Solutions"
                      required
                    />
                  </FormField>

                  {/* Date */}
                  <FormField id="date" label="Date" icon={<MdCalendarToday className="text-blue-600 w-6 h-6" />}>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={eventData.date}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </FormField>

                  {/* Time */}
                  <FormField id="time" label="Time" icon={<MdAccessTime className="text-blue-600 w-6 h-6" />}>
                    <input
                      type="time"
                      id="time"
                      name="time"
                      value={eventData.time}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </FormField>
                </div>

                {/* Venue */}
                <FormField id="venue" label="Venue" icon={<MdLocationOn className="text-blue-600 w-6 h-6" />}>
                  <input
                    type="text"
                    id="venue"
                    name="venue"
                    value={eventData.venue}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., The Digital Forum, 123 Tech Street"
                    required
                  />
                </FormField>

                {/* Submit Button */}
                <div className="text-center mt-8">
                  <ButtonDefault
                    text={"Create Event"}
                    submitType={true}
                    className="!bg-primary !text-background font-medium rounded-md"
                  />
                </div>
              </form>
            </div>
          </main>
        </div>
      </SignedIn>

      <SignedOut>
        <div className="flex flex-col justify-center items-center">
          <div className="text-3xl font-medium">Please sign in to access this page</div>
          <Link href={"/login"} className="bg-primary text-xl font-medium rounded-md text-background px-4 py-2">
            Login
          </Link>
        </div>
      </SignedOut>
    </>
  );
}
