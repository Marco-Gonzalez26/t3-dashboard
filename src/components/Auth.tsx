import React from "react";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { signIn, signOut, useSession } from "next-auth/react";

const Auth: React.FC = () => {
  const { status } = useSession();

  const handleSingIn = async () => {
    await signIn("google", { redirect: true, callbackUrl: "/panel" });
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/", redirect: true });
  };
  return (
    <button
      className="  flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700"
      onClick={
        status === "authenticated" ? () => handleLogout() : () => handleSingIn()
      }
    >
      {status === "authenticated" ? "Cerrar Sesión" : "Iniciar Sesión"}
      <span className="ml-2 text-indigo-200" aria-hidden="true">
        <ArrowLongRightIcon width={15} />
      </span>
    </button>
  );
};

export default Auth;
