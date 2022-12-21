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

  return (
    <>
      <nav className=" hidden  h-12 w-full  items-center justify-around rounded-lg bg-white p-4 md:flex">
        <Link href="/" className="text-xl font-bold text-gray-700">
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
      <div className="z-index-10 fixed flex h-[90%] w-72 items-start justify-start md:opacity-0">
        {open && (
          <ul className="sticky left-0 top-0 flex h-full w-full flex-col gap-5 rounded-xl bg-white p-5 text-lg font-semibold text-gray-700 shadow-lg shadow-gray-800 md:hidden">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="w-full text-2xl  font-extrabold text-gray-700"
              >
                Logo
              </Link>

            </div>
            {navData.map(({ path, text }) => {
              return (
                <Link href={path} className="w-full " key={text}>
                  <li className=" cursor-pointer rounded-lg border-2 border-transparent p-2 transition-all hover:border-violet-500">
                    {text}
                  </li>
                </Link>
              );
            })}
          </ul>
        )}
        <Bars3Icon
          width={50}
          height={50}
          className=" w-14  cursor-pointer rounded-full p-2  text-gray-700 shadow-gray-200 bg-white shadow-lg md:hidden"
          onClick={() => setOpen(!open)}
        />
      </div>
    </>
  );
}

export default NavBar;
