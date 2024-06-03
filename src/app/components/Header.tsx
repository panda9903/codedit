import React from "react";
import { HeaderButton } from "./HeaderButton";
import Logo from "./Logo";

interface User {
  username: string;
  socketId: string;
}

const Header = ({}: {}) => {
  return (
    <>
      <div className="flex px-6 py-3 sticky top-0 z-50 bg-gray-100 justify-between gap-6 w-screen z-100">
        <Logo />
        <HeaderButton />
      </div>
    </>
  );
};

export default Header;
