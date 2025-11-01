import { FiArrowUpRight } from "react-icons/fi";

interface props {
  title: string;
  cardStyle?: string;
  headingStyle?: string;
  descriptionStyle?: string;
}

const StudentDataCard = ({ title }: props) => {
  // const description = useMemo(() => {
  //   return body.map((elem, index) => {
  //     return <p key={index}>{elem}</p>;
  //   });
  // }, [body]);
  // return (
  //   <div
  //     className={
  //       "border-secondary border inline-block rounded-md px-4 py-2 bg-secondary-faded hover:border-2 hover:scale-[102%] transition-all " +
  //       cardStyle
  //     }
  //   >
  //     <p className={"font-medium text-xl " + headingStyle}>{title}</p>
  //     <div className={"mt-4 " + descriptionStyle}>{description}</div>
  //   </div>
  // );
  return (
    <button className="bg-blue-50 text-gray-700 font-semibold p-5 rounded-lg shadow-sm hover:bg-blue-100 hover:-translate-y-0.5 transform transition flex justify-between items-center text-left">
      <span>{title}</span>
      <FiArrowUpRight size={20} className="text-gray-500" />
    </button>
  );
};

export default StudentDataCard;
