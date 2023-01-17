import React from "react";

interface Props {
  children: JSX.Element | JSX.Element[] | undefined;
}
const Layout: React.FC<Props> = ({ children }) => {
  return (
    <section className=" flex min-h-screen w-full flex-col items-center justify-start overflow-y-hidden  rounded-lg bg-white p-4 shadow-sm shadow-white md:p-8 overflow-hidden">
      {children}
    </section>
  );
};

export default Layout;
