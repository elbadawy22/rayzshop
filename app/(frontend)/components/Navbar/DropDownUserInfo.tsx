"use client";
import { useState } from "react";
import { UserProfile } from "../../lib/taypes";
import {
  CircleUser,
  LogOut,
  MessageCircleQuestionMark,
  SlidersHorizontal,
} from "lucide-react";
import Link from "next/link";

const DropDownUserInfo = ({ user }: { user: UserProfile }) => {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <>
      <button
        className="inline-flex items-center justify-center text-slate-800 cursor-pointer "
        type="button"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-1 hover:bg-gray-100 px-2 py-1 rounded">
          <p className="text-gray-800 text-sm">{user?.name}</p>
          <span className="text-gray-50 bg-gray-400 text-sm flex justify-center items-center w-6 h-6  rounded-full">
            {user?.name.split("")[0].toUpperCase()}
          </span>
        </div>
      </button>
      {/* <!-- Dropdown menu --> */}
      <div
        hidden={open}
        className="absolute z-1 top-12 bg-white  rounded-base shadow-lg w-72"
      >
        <div className="p-2  ">
          <div className="border-b-2 border-b-gray-200 flex items-center px-2.5 p-2 space-x-1.5 text-sm  rounded">
            <div className=" flex items-center gap-1 font-medium text-heading text-slate-900">
              {" "}
              <span className="text-gray-50 bg-gray-400 text-sm flex justify-center items-center w-6 h-6  rounded-full">
                {user?.name.split("")[0].toUpperCase()}
              </span>
              <p className="flex flex-col text-gray-800 text-sm">
                <span className="px-1"> {user.name}</span>
                <span className="truncate text-body text-xs text-gray-600">
                  {user?.email}
                </span>
              </p>
            </div>
          </div>
        </div>
        <ul className="px-2 pb-2 text-sm text-body font-medium">
          <li>
            <Link
              href="/me"
              className="inline-flex gap-1 items-center w-full p-2 hover:bg-gray-100 text-gray-400 rounded"
              onClick={() => setOpen(true)}
            >
              <CircleUser className="w-4" />
              Account
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="inline-flex gap-1 items-center w-full hover:bg-gray-100 p-2 text-gray-400 rounded"
            >
              <MessageCircleQuestionMark className="w-4" />
              Help center
            </Link>
          </li>
          <li className="border-t border-gray-400 pt-1.5">
            <button
              type="submit"
              className="inline-flex gap-1 cursor-pointer items-center w-full p-2 hover:bg-red-200 text-red-700 rounded"
            >
              <LogOut className="w-4" />
              Sign out
            </button>
          </li>
        </ul>
      </div>
      {!open ? (
        <div
          className="  w-screen h-screen min-h-5000 min-w-5000 top-12 bg-transparent  absolute "
          onClick={() => setOpen(true)}
        ></div>
      ) : (
        ""
      )}
    </>
  );
};

export default DropDownUserInfo;
