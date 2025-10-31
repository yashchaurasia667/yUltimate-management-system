import StudentDataCard from "@/components/studentDataCard";
const page = () => {
  const assesments = ["Chemistry: Pending", "Physics: 1/4"];
  return (
    <StudentDataCard title="Assesment Status" body={assesments} cardStyle="m-5" />
  )
}

export default page
