import React from "react";
import Logo from "./Logo";

const Footer = () => {
  return (
    <div className=" bg-gray-200 w-screen md:p-16 md:pt-4 p-6 pb-12 flex flex-col gap-10 ">
      <Logo />
      <div className="grid grid-cols-2 w-3/4">
        <a href="https://github.com/panda9903/codedit" target="_blank">
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/satwikpanda9903/" target="_blank">
          LinkedIn
        </a>
      </div>
    </div>
  );
};

export default Footer;
