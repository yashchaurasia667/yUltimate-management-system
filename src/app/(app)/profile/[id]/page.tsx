import StudentDataCard from "@/components/studentDataCard";
import ProfileEventCard from "@/components/profileEventCard";
import ProfileHeader from "@/components/profileHeader";

const Navigation = () => {
  const buttons = ["LSAS Assessment", "Assignment Status", "Classes/Sessions"];

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4 my-5">
      {buttons.map((text, index) => (
        <StudentDataCard title={text} key={index} />
      ))}
    </section>
  );
};

const ParticipationHistory = () => (
  <section className="bg-white rounded-lg shadow-md p-6">
    <h2 className="text-xl font-semibold text-gray-600 mb-4 pb-3 border-b border-gray-100">Participation History:</h2>
    <div className="flex flex-col gap-4">
      <ProfileEventCard
        status="live"
        name={"Ultimate Frisbee"}
        type={"Team GitCats"}
        position={"Participant"}
        organizer={"Y-Ultimate"}
        eventProfile={"/cat.webp"}
      />
      <ProfileEventCard
        status="closed"
        name={"Ultimate Frisbee"}
        type={"Team GitCats"}
        position={"Participant"}
        organizer={"Y-Ultimate"}
        eventProfile={"/cat.webp"}
      />
    </div>
  </section>
);

// --- Main App Component ---
export default function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="max-w-5xl mx-auto p-4 md:p-8">
        <ProfileHeader />
        <Navigation />
        <ParticipationHistory />
      </main>
    </div>
  );
}
