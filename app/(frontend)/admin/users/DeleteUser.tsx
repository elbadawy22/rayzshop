"use client";

import { AlertTriangle, Trash2, X } from "lucide-react";
import { useState } from "react";
import { UsersDots } from "../../lib/taypes";
import { deleteUser } from "../../lib/services/client/users.services";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

// import { useRouter } from "next/navigation";

const DeleteUser = ({ user }: { user: UsersDots }) => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const handelDeleteUser = async () => {
    const userDel = await deleteUser(user.id);
    if (userDel?.message?.includes("Successfully")) {
      toast.success(userDel.message, { className: "bg-white" });
      router.replace("/admin/users");
    } else {
      toast.error(userDel?.message);
    }
  };
  return (
    <>
      <div
        title="delete user"
        className=" fixed bottom-5 z-3 w-full  flex justify-end items-center px-5 pb-3   "
      >
        <div
          className=" text-gray-50 rounded-full hover:bg-red-600 bg-red-800 w-10 h-10 flex flex-col justify-center items-center cursor-pointer transition-all ease-in-out duration-300  "
          onClick={() => setOpen(!open)}
        >
          <Trash2 className="w-6 h-6  " />
        </div>
      </div>

      <>
        <div
          onClick={() => setOpen(false)}
          className={`${!open ? "translate-x-150 sm:translate-x-250 md:translate-x-400  lg:translate-x-700 xl:translate-x-2000 2xl:translate-x-2000 " : ""} px-5 w-screen h-screen flex justify-center  right-[5%] min-w-screen lg:left-[3%] md:left-[3%]  items-center backdrop-blur-xs backdrop-brightness-50  top-0 z-900000 translate-x-5 md:-translate-x-10 transition-all ease-(--my-ease) duration-300  fixed    `}
        >
          <div className="bg-white drop-shadow-xl drop-shadow-gray-300 rounded-md  w-full max-w-150">
            <div className="w-full border-b border-b-gray-300 flex justify-end px-2 py-1 ">
              <X
                onClick={() => setOpen(false)}
                className="w-5 h-5 text-gray-500  hover:text-slate-950 cursor-pointer "
              />
            </div>
            <div className=" py-4 px-3 w-full border-b border-b-gray-300 flex gap-1 items-center">
              <AlertTriangle className="text-red-500" />
              <h3>Are You Sure to Delete This User...!?</h3>
            </div>
            <div className=" flex gap-1 py-2 px-3">
              <button
                onClick={() => handelDeleteUser()}
                className="cursor-pointer hover:bg-red-700 bg-red-800 text-gray-50 px-4 rounded"
              >
                Delete
              </button>
              <button
                onClick={() => setOpen(false)}
                className="cursor-pointer hover:bg-gray-500 bg-gray-700 text-gray-50 px-3 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default DeleteUser;
