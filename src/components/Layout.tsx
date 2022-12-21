import React from "react";

interface Props {
  children: JSX.Element;
}
const Layout: React.FC<Props> = ({ children }) => {
  return <section className="md:p-8 p-4 w-full h-screen bg-white rounded-lg flex flex-col  shadow-sm shadow-white items-center justify-center">{children}</section>;
};

export default Layout;
