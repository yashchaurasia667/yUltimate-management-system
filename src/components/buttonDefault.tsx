interface props {
  text: string;
  className?: string;
  submitType?: boolean;
}

const ButtonDefault = ({ text, className = "", submitType = false }: props) => {
  if (submitType)
    return (
      <button
        className={`text-text font-medium bg-white text-lg px-6 py-3 outline-none cursor-pointer hover:font-semibold hover:scale-105 transition-all ${className}`}
      >
        {text}
      </button>
    );
  else
    return (
      <button
        className={`text-text font-medium bg-white text-lg px-6 py-3 outline-none cursor-pointer hover:font-semibold hover:scale-105 transition-all ${className}`}
      >
        {text}
      </button>
    );
};

export default ButtonDefault;
