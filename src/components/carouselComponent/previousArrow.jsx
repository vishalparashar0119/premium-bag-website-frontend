import { IoIosArrowBack } from "react-icons/io";

export const PrevArrow = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className=" hidden
        absolute z-10
        right-4 bottom-3
        w-10 h-12
        bg-gray/60 text-white
        md:flex items-center justify-center
        cursor-pointer
      "
    >
      <IoIosArrowBack className="h-6 w-6"/>
    </div>
  );
};
