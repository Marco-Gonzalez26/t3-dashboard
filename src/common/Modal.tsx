import React from "react";
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/20/solid";

export const Modal: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: JSX.Element | JSX.Element[];
  title?: string;
}> = ({ open, setOpen, children, title }) => {
  const cancelButtonRef = useRef(null);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto "
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8  sm:max-w-screen-xl sm:align-middle ">
              <div className="bg-gray-50 px-4 py-3 text-left sm:flex sm:flex-row-reverse sm:px-6 items-center justify-between">
                <XCircleIcon
                  className="h-6 w-6 flex-shrink-0 cursor-pointer text-right text-gray-400"
                  aria-hidden="true"
                  onClick={() => setOpen(false)}
                  ref={cancelButtonRef}
                />
                <h3 className="font-bold text-gray-700 md:text-xl">{title}</h3>
              </div>
              <div className="bg-white px-4 pt-2 pb-4 sm:p-8 sm:pb-4">
                <div className="sm:flex sm:items-start">{children}</div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
