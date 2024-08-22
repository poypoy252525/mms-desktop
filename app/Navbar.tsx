import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex items-center px-6 bg-slate-200 h-[64px] w-full">
      <Link href="/" className="font-bold text-xl">
        Navigatioin bar
      </Link>
    </nav>
  );
};

export default Navbar;
