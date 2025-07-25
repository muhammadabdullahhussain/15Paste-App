import { createSlice } from "@reduxjs/toolkit";
import { Bounce, toast } from "react-toastify";
const pastesStorage = JSON.parse(localStorage.getItem("pastes"));

const error =  () => {
  toast.error("Error : paste already exits", {
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
}
const toasts =(cause) => {
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
}

const initialState = {
  pastes: localStorage.getItem("pastes") ? pastesStorage : [],
};

export const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;
      const isPasteExits = state.pastes.find((data) => {
        return data.title === paste.title || data.content === paste.content;
      });

      if (!isPasteExits) {
        state.pastes.push(paste);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toasts("Toast Created Successfully")
      } else {
       error()
      }
    },

    
    updateToPastes: (state, action) => {
      const paste = action.payload
      const index = state.pastes.findIndex((item) => item._id === paste._id)
      if(index >= 0){
        state.pastes[index] = paste
        localStorage.setItem('pastes' , JSON.stringify(state.pastes))
        toasts('Paste Updated successfully')
      }else{
        toast.error('paste not found')
      }
    },
    resetAllPastes: (state, action) => {
      state.pastes = [];
      localStorage.removeItem('pastes')
      toast('All Paste has been Reset')
    },
    removeFromPastes: (state, action) => {
      const pasteId = action.payload
      const index = state.pastes.findIndex((item) => item._id = pasteId)
      if(index >= 0) {
        state.pastes.splice(index, 1)
        localStorage.setItem('pastes' , JSON.stringify(state.pastes))
        toasts('Paste removed successfully')
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { removeFromPastes, resetAllPastes, updateToPastes, addToPastes } =
  pasteSlice.actions;

export default pasteSlice.reducer;
