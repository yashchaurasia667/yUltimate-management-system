"use client";
import Image from "next/image";

type eventType = {
  id: number;
  img: string;
  title: string;
  description: string;
  date: string;
};

type partnerType = {
  id: number;
  name: string;
  name2: string | null;
  color: string;
  style: string;
};

// --- Data Stubs ---
const eventsData = [
  {
    id: 1,
    img: "https://placehold.co/400x200/94A3B8/FFFFFF?text=Field+Session",
    title: "Event Title",
    description:
      "Our mission is to impart life skills education to children, especially those from lesser privileged socio-economic backgrounds, through the sport of Ultimate Frisbee.",
    date: "25 JUN 2024",
  },
  {
    id: 2,
    img: "https://placehold.co/400x200/4F46E5/FFFFFF?text=Group+Photo",
    title: "Community Session",
    description:
      "Our mission is to impart life skills education to children, especially those from lesser privileged socio-economic backgrounds, through the sport of Ultimate Frisbee.",
    date: "01 JUL 2024",
  },
  {
    id: 3,
    img: "https://placehold.co/400x200/10B981/FFFFFF?text=Hand+Circle",
    title: "Skill Workshop",
    description:
      "Our mission is to impart life skills education to children, especially those from lesser privileged socio-economic backgrounds, through the sport of Ultimate Frisbee.",
    date: "10 JUL 2024",
  },
  {
    id: 4,
    img: "https://placehold.co/400x200/F97316/FFFFFF?text=E-Learning",
    title: "Virtual Training",
    description:
      "Our mission is to impart life skills education to children, especially those from lesser privileged socio-economic backgrounds, through the sport of Ultimate Frisbee.",
    date: "18 JUL 2024",
  },
  {
    id: 5,
    img: "https://placehold.co/400x200/DC2626/FFFFFF?text=Team+Event",
    title: "Tournament Prep",
    description:
      "Our mission is to impart life skills education to children, especially those from lesser privileged socio-economic backgrounds, through the sport of Ultimate Frisbee.",
    date: "25 JUL 2024",
  },
];

const partnersData = [
  { id: 1, name: "SAHYOG", name2: "FOUNDATION", color: "text-cyan-600", style: "font-black tracking-widest" },
  { id: 2, name: "मुस्कान", name2: "FOUNDATION", color: "text-neutral-900", style: "text-3xl font-extrabold" },
  { id: 3, name: "Avasara Academy", name2: null, color: "text-yellow-700", style: "text-xl italic font-serif" },
  { id: 4, name: "PARTNER", name2: "FOUR", color: "text-red-600", style: "text-3xl font-bold" },
  { id: 5, name: "KODSE EDUCATION", name2: "SOLUTION", color: "text-blue-600", style: "text-lg font-mono" },
];

/**
 * Reusable component for displaying an event card.
 */
const EventCard = ({ event }: { event: eventType }) => (
  <div className="shrink-0 w-72 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-0.5 cursor-pointer border border-gray-100">
    {/* Image */}
    <img src={event.img} alt={event.title} className="w-full h-36 object-cover rounded-t-xl" />

    {/* Content */}
    <div className="p-4 space-y-3">
      <div className="flex justify-between items-center text-xs font-semibold text-gray-500">
        <span className="text-gray-900 font-extrabold text-base">{event.title}</span>
        {/* Subtle "UPCOMING" text label */}
        <span className="text-red-600 uppercase font-bold tracking-tight border border-red-100 px-2 rounded-full">
          UPCOMING
        </span>
      </div>

      <p className="text-sm text-gray-600 leading-snug">{event.description}</p>

      {/* Button/Action row */}
      <div className="pt-2 flex justify-between items-center text-xs">
        <button className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors">
          Read Full Details
        </button>
        {/* Date at the bottom right, subtle text */}
        <span className="text-gray-400 text-xs">{event.date}</span>
      </div>
    </div>
  </div>
);

/**
 * Component to render stylized partner text logos
 */
const PartnerLogo = ({ partner }: { partner: partnerType }) => (
  <div className="w-32 h-20 sm:w-40 sm:h-24 flex items-center justify-center p-2 rounded-xl bg-white border border-gray-100 hover:border-indigo-300 transition-all duration-300 shadow-sm">
    <div className={`text-center leading-none ${partner.color} ${partner.style}`}>
      <span className="block">{partner.name}</span>
      {partner.name2 && <span className="block text-xs font-light mt-1 text-gray-500">{partner.name2}</span>}
    </div>
  </div>
);

/**
 * The main Next.js Page component.
 */
const Hero = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="relative h-[380px] sm:h-[450px] overflow-hidden mx-4 sm:mx-8 md:mx-12 lg:mx-20 rounded-xl mt-4">
        <Image
          src="/banner.png"
          alt="Cartoon illustration of children studying in a classroom"
          fill
          priority
          className="object-cover brightness-[0.7] contrast-[1.1]"
        />

        <div className="relative z-10 flex items-center justify-center h-full text-center p-6">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold max-w-5xl leading-tight tracking-tight drop-shadow-lg">
            Our mission is to impart life skills education in children, especially those from lesser privileged
            socio-economic backgrounds, through the sport of <span className="text-yellow-300">Ultimate Frisbee.</span>
          </h1>
        </div>
      </div>

      {/* 2. Ongoing Events and Sessions Section */}
      <section className="py-12 px-4 sm:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Ongoing Events and Sessions</h2>
            <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
              View all &gt;
            </a>
          </div>

          {/* Horizontal Scrolling Cards Container */}
          <div className="flex space-x-6 pb-4 overflow-x-auto scrollbar-hide">
            {eventsData.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}

            {/* The 'View More' card shown in the original image */}
            <div className="shrink-0 w-72 flex items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-6 cursor-pointer hover:bg-gray-100 transition-colors shadow-inner">
              <a href="#" className="text-center text-indigo-600 font-semibold">
                View More Events
              </a>
            </div>
          </div>
          {/* Scrollbar hide utility (required to match the image's clean look) */}
          <style jsx global>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>
        </div>
      </section>

      {/* 3. Our Partners Section */}
      <section className="py-12 px-4 sm:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Our Partners</h2>
          <p className="text-gray-600 mb-8">
            Our growing family of partners that enable us to expand our reach and impact!
          </p>

          {/* Partners Grid/Flex Row - Removed 'rounded-2xl' */}
          <div className="flex flex-wrap justify-center sm:justify-around lg:justify-between items-center gap-6 p-6 bg-white shadow-xl border border-gray-100">
            {partnersData.map((partner) => (
              <PartnerLogo key={partner.id} partner={partner} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
