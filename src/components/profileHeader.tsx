import Image from "next/image";

interface props {
  userName: string;
  attendance: number;
  profileUrl: string;
  type: "coach" | "student";
}

const ProfileHeader = ({ userName, attendance, profileUrl, type }: props) => {
  const avatarBgStyle = {
    backgroundImage: "repeating-conic-gradient(#e0e0e0 0% 25%, #ffffff 0% 50%)",
    backgroundPosition: "0 0",
    backgroundSize: "16px 16px",
  };

  return (
    <section className="bg-linear-to-b from-blue-200 to-cyan-100 rounded-xl p-6 flex items-center">
      <div
        className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white mr-5 shrink-0 overflow-hidden"
        style={avatarBgStyle}
      >
        <Image src={profileUrl} alt={"profile"} width={250} height={250} loading="eager" />
      </div>
      <div className="text-gray-800">
        <h1 className="text-2xl md:text-3xl font-bold">{userName}</h1>
        {type === "student" ? (
          <p className="text-base md:text-lg font-semibold text-gray-700">{`Attendance: ${attendance}%`}</p>
        ) : (
          ""
        )}
      </div>
    </section>
  );
};

export default ProfileHeader;
