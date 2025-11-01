import Image from "next/image";
import ButtonDefault from "./buttonDefault";

interface props {
  name: string;
  date: Date;
  organizer: string;
  description: string;
  type: string;
  src: string;
}

const EventCard = ({ name, description, organizer, date, type, src }: props) => {
  return (
    <div className="rounded-lg border border-secondary inline-block max-w-[450px] w-1/4 overflow-hidden cursor-pointer hover:border-2 hover:scale-[102%] transition-all">
      <span className="w-full">
        <Image src={src} alt={name} width={100} height={100} loading="lazy" className="w-full" />
      </span>
      <div className="py-4 px-3 mt-5">
        <div className="flex justify-between items-center px-2">
          <span className="grid grid-rows-2">
            <span className="font-semibold text-2xl">{name}</span>
            <span className="font-medium">{`Organized By: ${organizer}`}</span>
          </span>
          <span className="bg-secondary-faded rounded-md p-2">{date.toLocaleDateString()}</span>
        </div>
        <div className="mt-3 bg-secondary-faded px-2 py-2 rounded-lg">
          {description}
          <div className="mt-8 flex justify-between items-center">
            <span className="bg-background rounded-md text-lg px-2 py-1">{`Type: ${type}`}</span>
            <ButtonDefault text="Register" className="rounded-full !bg-accent" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
