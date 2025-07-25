import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
import { LuCopy } from "react-icons/lu";
import { Bounce, toast } from "react-toastify";

const toasts = (cause) => {
  toast.success(cause, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  });
};

const ViewPaste = () => {
  const { idd } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.filter((p) => p._id === idd)[0];
  //   console.log("final paste", paste);

  return (
    <div className="min-h-full   text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl bg-gray-800 rounded-2xl shadow-lg p-8 space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            className="flex-1 p-3 rounded-xl bg-gray-700 border border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Enter title here"
            disabled
            value={paste.title}
          />
        </div>

        <div className="bg-[#364153] rounded-xl p-4 relative">
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
            </div>
            <LuCopy
              onClick={() => {
                navigator.clipboard.writeText(paste.content);
                toasts("copied successfully");
              }}
              className="text-2xl cursor-pointer text-white hover:text-blue-400 transition duration-300"
            />
          </div>
        </div>

        <textarea
          value={paste.content}
          placeholder="Enter content here"
          className="w-full h-[600px] p-5 text-lg rounded-xl bg-gray-700 border border-gray-600 placeholder-gray-400 text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          cols={900}
          disabled
        ></textarea>
      </div>
    </div>
  );
};

export default ViewPaste;
