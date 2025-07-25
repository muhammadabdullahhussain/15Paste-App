import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
import { LuCopy } from "react-icons/lu";
import { Bounce, toast } from "react-toastify";
import { LuCirclePlus } from "react-icons/lu";


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
const toastsError = (cause) => {
  toast.error(cause, {
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

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      console.log(paste);

      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId]);

  function createPaste() {
    // e.preventDefault()
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toDateString(),
    };

    if (pasteId) {
      //update
      dispatch(updateToPastes(paste));
    } else {
      //create
      dispatch(addToPastes(paste));
    }

    // after creation  or updation
    setTitle("");
    setValue("");
    setSearchParams({});
  }


  return (
    <div className="min-h-full   text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl bg-gray-800 rounded-2xl shadow-lg p-8 space-y-6">

        <div className="flex flex-col sm:flex-row gap-4">
          <input
            className="flex-1 p-3 rounded-xl bg-gray-700 border border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Enter title here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            onClick={createPaste}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition duration-300 font-semibold text-white"
          >
            {pasteId ? "Update Paste" : "Create My Paste"}
          </button>

          {pasteId &&
            <Link
              to='/'
              className="px-6 py-0 flex items-center  rounded-xl  bg-blue-600 hover:bg-blue-700 transition duration-300 font-semibold text-white">
              <LuCirclePlus className="text-white text-3xl" />
            </Link>}

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
                value.length > 0 ? navigator.clipboard.writeText(value) &&
                  toasts('copied successfully') : toastsError('there is not text to copy')

              }}
              className="text-2xl cursor-pointer text-white hover:text-blue-400 transition duration-300"
            />
          </div>
        </div>

        <textarea
          value={value}
          placeholder="Enter content here"
          onChange={(e) => setValue(e.target.value)}
          className="w-full h-[600px] p-5 text-lg rounded-xl bg-gray-700 border border-gray-600 placeholder-gray-400 text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          cols={900}
        > </textarea>
      </div>
    </div>
  );
};

export default Home;
