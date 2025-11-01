import { PiDotOutlineFill } from "react-icons/pi";
import { FaCheckCircle } from "react-icons/fa";

interface props {
  status: string;
  name: string;
  type: string;
  position: string;
  organizer: string;
  eventProfile: string;
}

const CheckMark = () => (
  <div className="w-6 h-6 bg-green-500 rounded-full text-white flex items-center justify-center shrink-0">
    <FaCheckCircle size={16} strokeWidth={0} />
  </div>
);

const ProfileEventCard = ({ name, type, position, organizer, eventProfile, status }: props) => {
  const isLive = status === "live";

  return (
    <article className="border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row items-center gap-4">
      {/* Item Icon Placeholder */}
      <div className="w-16 h-16 bg-gray-100 border-dashed border-gray-300 rounded-lg shrink-0"></div>

      {/* Item Details */}
      <div className="grow text-center sm:text-left">
        <h3 className="text-lg font-semibold">{name}</h3>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full my-1 inline-block">
          {position}
        </span>
        <p className="text-sm text-gray-500">Organized by: {organizer}</p>
        <p className="text-sm text-gray-500">Participated as: {type}</p>
      </div>

      {/* Item Checks */}
      <div className="flex gap-2 my-2 sm:my-0 sm:mx-4">
        <CheckMark />
        <CheckMark />
        <CheckMark />
      </div>

      {/* Status Button */}
      <div className="shrink-0">
        <button className="bg-yellow-100 text-yellow-800 font-semibold py-2 px-5 rounded-full flex items-center gap-1">
          <span>{isLive ? "Live" : "Closed"}</span>
          <PiDotOutlineFill
            size={32}
            className={isLive ? "text-green-500" : "text-red-500"}
            style={{ margin: -10 }} // Pull dot closer
          />
        </button>
      </div>
    </article>
  );
};

export default ProfileEventCard;
