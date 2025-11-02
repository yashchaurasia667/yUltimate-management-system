import StudentDataCard from "@/components/studentDataCard";
import EventCard from "@/components/eventCard";

const page = () => {
  const assesments = ["Chemistry: Pending", "Physics: 1/4"];
  return (
    <>
      <div className="mt-8">
        <StudentDataCard title="Assesment Status"  cardStyle="m-5" />
        <EventCard
          name="Softball"
          description="Our mission is to impart life skills education in children especially those from lesser privileged socio-economic backgrounds,through the sport of Ultimate Frisbee."
          organizer="Yultimate"
          date={new Date(Date.now())}
          type="Team"
          src="/cat.webp"
        />
      </div>
    </>
  );
};

export default page;
