import { useState } from "react";
import Link from "next/link";

import { navData, noAuthNavData } from "@lib/navData";
import {
  Bars3Icon,
  XMarkIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";
import Auth from "./Auth";
import { useSession } from "next-auth/react";

function NavBar() {
  const [open, setOpen] = useState<boolean>(false);
  const { data: session, status } = useSession();
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
      <nav className=" hidden  h-16 w-full items-center justify-around rounded-lg bg-white p-4 md:flex">
        <Link
          href="/"
          className=" cursor-pointer text-xl font-bold text-gray-700"
        >
          <span className="flex items-center justify-between">
            <BuildingOfficeIcon width={30} />
            AlwaysPanel
          </span>
        </Link>
        <ul className="flex items-center justify-center gap-5 text-lg font-semibold text-gray-700">
          {status === "authenticated"
            ? navData.map(({ path, text }) => {
                return (
                  <li
                    key={text}
                    className="  border-2 border-transparent px-2 transition-all hover:border-b-violet-500"
                  >
                    <Link href={path} className="w-full ">
                      {text}
                    </Link>
                  </li>
                );
              })
            : noAuthNavData.map(({ id, text }) => {
                return (
                  <li
                    key={text}
                    className="   border-2 border-transparent px-2 transition-all hover:border-b-violet-500"
                  >
                    <a href={id} className="w-full ">
                      {text}
                    </a>
                  </li>
                );
              })}

          <Auth />
          {session?.user && (
            <div className="flex items-center gap-2 text-sm">
              <img
                src={session.user.image!}
                className="h-8 w-8 rounded-full ring-1 ring-violet-700"
              />
              <p>{session.user.name}</p>
            </div>
          )}
        </ul>
      </nav>
      {open && (
        <div
          className={` fixed z-10 flex h-[90%] w-72 items-start justify-start opacity-0 md:hidden ${
            open ? "flex opacity-100" : ""
          } transition-all`}
        >
          <ul
            className={`sticky left-0 top-0  z-50 h-full w-full flex-col gap-5 rounded-xl bg-white p-5 text-lg font-semibold text-gray-700 shadow-lg shadow-gray-300 md:hidden `}
          >
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="mb-2 text-xl font-bold text-gray-700"
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
            {status === "authenticated"
              ? navData.map(({ path, text }) => {
                  return (
                    <Link
                      href={path}
                      className=" hover:opacity-85  cursor-pointer rounded-lg border-2 border-transparent   px-2 transition-all"
                      key={text}
                      onClick={() => setOpen(false)}
                    >
                      <li>{text}</li>
                    </Link>
                  );
                })
              : noAuthNavData.map(({ id, text }) => {
                  return (
                    <li
                      key={text}
                      className="  hover:opacity-85  mb-5 cursor-pointer rounded-lg border-2  border-transparent p-2 transition-all"
                      onClick={() => setOpen(false)}
                    >
                      <a href={id}>{text}</a>
                    </li>
                  );
                })}
            <Auth />
          </ul>
        </div>
      )}
      {!open && (
        <Bars3Icon
          width={50}
          height={50}
          className=" absolute  z-50  w-14  cursor-pointer rounded-full  bg-white p-2  text-gray-700 md:hidden "
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
