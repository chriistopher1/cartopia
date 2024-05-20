import React from "react";

type propTypes = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};
const Modal: React.FC<propTypes> = ({ open, onClose, children }) => {
  return (
    <div
      className={`fixed inset-0 flex justify-center items-center 
    transition-colors ${open ? "visible bg-black/20" : "invisible"}
    `}
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-lg shadow p-6
        transition-all max-w-md max-sm:max-w-sm 
        ${open ? "scale-100 opacity-100" : "scale-110 opacitiy-0"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-6 right-3 py-1 px-2 
             rounded-md text-blue-400
            bg-white hover:bg-gray-50 hover:text-blue-600 font-bold"
          onClick={onClose}
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
