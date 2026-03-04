"use client";
import { createNewUser } from "@/app/(frontend)/lib/services/client/users.services";
import { UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const CreateUsers = () => {
  const router  = useRouter()
  const handelAction = async (e: FormData) => {
  const creater = await createNewUser(e);
  if (creater.ok) {
    const success = await creater.json();
    toast.success(success.message);
    router.replace("/admin/users")
  }
  if (!creater.ok) {
    const fail = await creater.json();
    toast.error(fail.message);
  }
};
  return (
    <section className="p-5 ">
      <div className="  flex justify-center ">
        <div className="border-b border-b-gray-300 px-3 max-w-230 w-full shadow rounded-lg pt-5 pb-12">
          <h2 className="text-base/7 font-semibold flex items-center gap-1  ">
          <UserPlus/>
          Create A New User</h2>

          <p className="mt-1 text-sm/6 text-gray-400">
            Push a new user to manage your app
          </p>

          <form action={handelAction} className="w-full">
            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="name" className="block text-sm/6 font-medium ">
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Jone Dou"
                    autoComplete="given-name"
                    className="outline-1 shadow  outline-gray-600 block w-full rounded-md  px-3 py-1.5 text-base  -outline-offset-1  placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="phone" className="block text-sm/6 font-medium ">
                  Phone
                </label>
                <div className="mt-2">
                  <input
                    id="phone"
                    type="text"
                    name="phone"
                    placeholder="0123456789"
                    autoComplete="given-name"
                    className="outline-1 shadow  outline-gray-600 block w-full rounded-md  px-3 py-1.5 text-base  -outline-offset-1  placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6"
                    required
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="email" className="block text-sm/6 font-medium ">
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="example@example.com"
                    autoComplete="family-name"
                    className="shadow  outline-gray-600 block w-full rounded-md  px-3 py-1.5 text-base  outline-1 -outline-offset-1 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium "
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="•••••••••••"
                    autoComplete="family-name"
                    className="shadow  outline-gray-600 block w-full rounded-md  px-3 py-1.5 text-base  outline-1 -outline-offset-1 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="role" className="block text-sm/6 font-medium">
                  Role
                </label>
                <div className="mt-2 grid grid-cols-1">
                  <select
                    id="role"
                    name="role"
                    autoComplete="role-name"
                    className="shadow  outline-gray-600 col-start-1 row-start-1 w-full appearance-none rounded-md  py-1.5 pr-8 pl-3 text-base text-gray-600 outline-1 -outline-offset-1  *:bg-gray-200 *:rounded-md focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6"
                    required
                  >
                    <option className=" disabled ">Choose Role...</option>
                    <option value="ADMIN" className="text-black">
                      Admin
                    </option>
                    <option value="PRODUCTS_MANAGER" className="text-black">
                      Products Manager
                    </option>
                    <option value="ORDER_MANAGER" className="text-black">
                      Orders Manager
                    </option>
                  </select>

                  <svg
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    data-slot="icon"
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-400 sm:size-4"
                  >
                    <path
                      d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-center">
              <button
                type="submit"
                className="font-bold cursor-pointer hover:from-blue-600 max-w-100 w-full mt-8 text-gray-50 p-2 rounded-2xl bg-linear-to-r from-purple-600 to-blue-600"
              >
                Create User
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateUsers;
