import logo from "../image/logo.png";
import { FaUserAlt } from "react-icons/fa";
const Header = () => {
  return (
    <nav className="bg-white p-2.5 sm:p-4 h-16fixed w-full z-20 top-0 left-0 border-gray-100 border-b-[1px] border-solid">
      <div className=" flex flex-wrap items-center justify-between">
        <img src={logo} className="h-6 mr-3 sm:h-8" alt="logo" />
        <div className="flex md:order-2 items-center px-5 text-sm">
          <hr className="w-[0.8px] h-7 mx-5 bg-gray-100" />
          <FaUserAlt className="opacity-20 mr-2" />
          <span>찌후닝 님</span>
        </div>
      </div>
    </nav>
  );
};

export default Header;
