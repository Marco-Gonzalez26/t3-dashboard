import React, { useState } from "react";
import Link from "next/link";

import { navData } from "@lib/navData";
import {
  Bars3Icon,
  XMarkIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";

function NavBar() {
  const [open, setOpen] = useState<boolean>(false);
  const [popCard, setPopCard] = useState<string>("hidden");
  const [fade, setFade] = useState<boolean>(false);

  const handleMenuClick = () => {
    setPopCard("inline-block");
    setFade(true);
  };

  const handleXClick = () => {
    setPopCard("hidden");
    setFade(false);
  };
  return (
    <>
      <nav className=" hidden  h-12 w-full  items-center justify-around rounded-lg bg-white p-4 md:flex">
        <Link
          href="/"
          className=" cursor-pointer text-xl font-bold text-gray-700"
        >
          <span className="flex items-center justify-between">
            <BuildingOfficeIcon width={30} />
            AlwaysPanel
          </span>
        </Link>
        <ul className="flex gap-5 text-lg font-semibold text-gray-700 ">
          {navData.map(({ path, text }) => {
            return (
              <li
                key={text}
                className=" rounded-lg border-2 border-transparent px-2 transition-all hover:border-violet-500"
              >
                <Link href={path} className="w-full ">
                  {text}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      {open && (
        <div className="z-index-10 fixed flex h-[90%] w-72 items-start justify-start md:hidden">
          <ul
            className={`sticky left-0 top-0  h-full w-full flex-col gap-5 rounded-xl bg-white p-5 text-lg font-semibold text-gray-700 shadow-lg shadow-gray-800 md:hidden ${
              open ? "flex" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="text-xl font-bold text-gray-700"
                onClick={() => setOpen(false)}
              >
                <span className="flex items-center justify-between">
                  <BuildingOfficeIcon width={30} />
                  AlwaysPanel
                </span>
              </Link>
              <XMarkIcon
                width={50}
                height={50}
                className="   z-50 ml-4 w-14  cursor-pointer  rounded-full p-2 text-gray-700  md:hidden"
                onClick={() => {
                  setOpen(!open);
                  handleXClick();
                }}
              />
            </div>
            {navData.map(({ path, text }) => {
              return (
                <Link
                  href={path}
                  className="w-full cursor-pointer rounded-lg border-2 border-transparent p-2 transition-all hover:border-violet-300 hover:opacity-90"
                  key={text}
                  onClick={() => setOpen(false)}
                >
                  <li>{text}</li>
                </Link>
              );
            })}
          </ul>
        </div>
      )}
      {!open && (
        <Bars3Icon
          width={50}
          height={50}
          className=" absolute  z-50  w-14  cursor-pointer rounded-full  p-2 text-gray-700  md:hidden"
          onClick={() => {
            setOpen(!open);
            handleMenuClick();
          }}
        />
      )}
    </>
  );
}

export default NavBar;
