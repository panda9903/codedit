import React from "react";
import Logo from "./Logo";

const Footer = () => {
  return (
    <div className=" bg-gray-200 w-screen p-16 flex flex-col gap-10">
      <Logo />
      <div className="grid grid-cols-6">
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
