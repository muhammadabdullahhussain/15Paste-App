import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import { Bounce, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { IoCaretForwardOutline, IoEyeOutline } from "react-icons/io5";
import { MdIosShare } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { LuCopy } from "react-icons/lu";
import { CiCalendar } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { FiMoreHorizontal } from "react-icons/fi";

const Paste = () => {
  const toasts = (cause) => {
    toast.success(cause, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  const handleShare = (paste) => {
    if (navigator.share) {
      navigator
        .share({
          title: paste.title,
          text: paste.content,
          url: window.location.href, // optional: link to your app
        })
        .then(() => {
          toasts("Shared successfully!");
        })
        .catch((error) => {
          toast.error("Share failed");
          console.error("Error sharing:", error);
        });
    } else {
      toast.error("Sharing not supported on this device.");
    }
  };

  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase()));

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }
  return (
    <div>
      <input
        className="mt-7 w-full p-2 rounded-sm  bg-gray-800 text-white placeholder:text-lg placeholder:text-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        type="search"
        placeholder="🔍 Search paste here..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="border-[1px] border-gray-400 mt-5">
        <div className="border-b-[1px] py-3 border-gray-400 ">
          <h1 className="allpastes font-bold    pl-5 text-start ">All Pastes</h1>
        </div>

        <div className=" flex flex-col gap-5 mt-5 px-4 pb-4">
          {filteredData.length > 0 &&
            filteredData.map((paste) => {
              return (
                <div key={paste?._id} className="border-[1px] border-gray-400  ">

                  <div className="flex items-center justify-between px-3">
                    <div className="text-4xl font-semibold">{paste.title}</div>

                    <div className="flex flex-row gap-2 place-content-evenly mt-4">
                      <button className="outline">
                        <Link to={`/?pasteId=${paste?._id}`}>
                          <CiEdit className="text-gray-300 text-2xl font-bold hover:text-orange-400 transition duration-200" />
                        </Link>
                      </button>

                      <button className="outline" onClick={() => handleDelete(paste?._id)}>
                        <RiDeleteBinLine className="text-gray-300 text-2xl font-bold hover:text-orange-400 transition duration-200" />
                      </button>

                      <button className="outline" onClick={() => handleShare(paste)}>
                        <MdIosShare className="text-gray-300 text-2xl font-bold hover:text-orange-400 transition duration-200" />
                      </button>

                      <button className="outline">
                        <Link to={`/pastes/${paste?._id}`}>
                          <IoEyeOutline className="text-gray-300 text-2xl font-bold hover:text-orange-400 transition duration-200" />
                        </Link>
                      </button>

                      <button
                        className="outline"
                        onClick={() => {
                          navigator.clipboard.writeText(paste?.content);
                          toasts("Copied 📋 successfully");
                        }}
                      >
                        <LuCopy className="text-gray-300 text-2xl font-bold hover:text-orange-400 transition duration-200" />
                      </button>
                    </div>

                  </div>


                  <div className="flex items-center justify-between px-3 pb-2">
                    <div>{paste.content.length > 180 ? paste.content.slice(0, 100) + '...' : paste.content}</div>
                    <div className="flex items-center mt-3 text-xl font-[400]"><CiCalendar className="mr-2 text-3xl font-bold " /> {paste.createdAt}</div>
                  </div>

                </div>
              );
            })}
        </div>

      </div>
    </div>
  );
};

export default Paste;
