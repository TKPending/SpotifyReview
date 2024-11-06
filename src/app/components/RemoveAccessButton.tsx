import { useState, useEffect } from "react";

const RemoveAccessButton = () => {
  const [popup, setPopup] = useState<boolean>(false);

  const confirmRemoveAccess = () => {
    setPopup(true);
  };

  const handleRemoveAccess = (option: boolean) => {
    if (option) {
        // Remove Access
        return;
    }

    setPopup(false);
  };

  return (
    <div
      onClick={confirmRemoveAccess}
      className="flex items-center justify-center absolute top-5 right-10"
    >
      <p className="text-white font-semibold p-4 rounded-lg bg-green-600 hover:bg-green-800 transition duration-200 hover:cursor-pointer">
        Remove Access
      </p>

      {popup && (
        <div className="absolute top-16 text-white flex gap-6">
          <p onClick={() => handleRemoveAccess(true)} className="hover:text-green-300 hover:cursor-pointer">Confirm</p>
          <p onClick={() => handleRemoveAccess(false)} className="hover:text-red-200 hover:cursor-pointer">Decline</p>
        </div>
      )}
    </div>
  );
};

export default RemoveAccessButton;
