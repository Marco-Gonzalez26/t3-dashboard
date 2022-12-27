import React from "react";

interface Props {
  children: JSX.Element | JSX.Element[];
}
const Layout: React.FC<Props> = ({ children }) => {
  return (
    <section className=" flex h-screen w-full flex-col items-center justify-center overflow-y-hidden  rounded-lg bg-white p-4 shadow-sm shadow-white md:p-8">
      {children}
    </section>
  );
};

export default Layout;
