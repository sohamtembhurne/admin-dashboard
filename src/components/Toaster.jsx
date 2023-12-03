import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notifyDelete = () => toast.success("Row deleted successfully!");
export const notifyEdit = () => toast.success("Row edited successfully!");
export const notifyDeleteMultiple = (val) =>
  toast.success(`${val} rows deleted successfully!`);

const Toaster = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={1500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  );
};

export default Toaster;
