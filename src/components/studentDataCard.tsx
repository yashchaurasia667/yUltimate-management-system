import { useMemo } from "react";

interface props {
  title: string;
  body: string[];
  cardStyle?: string;
  headingStyle?: string;
  descriptionStyle?: string;
}

const StudentDataCard = ({ title, body, cardStyle = "", headingStyle = "", descriptionStyle = "" }: props) => {
  const description = useMemo(() => {
    return body.map((elem, index) => {
      return <p key={index}>{elem}</p>;
    });
  }, [body]);
  return (
    <div
      className={
        "border-secondary border inline-block rounded-md px-4 py-2 bg-secondary-faded hover:border-2 hover:scale-[102%] transition-all " +
        cardStyle
      }
    >
      <p className={"font-medium text-xl " + headingStyle}>{title}</p>
      <div className={"mt-4 " + descriptionStyle}>{description}</div>
    </div>
  );
};

export default StudentDataCard;
