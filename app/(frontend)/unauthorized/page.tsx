import { UserRoundX } from "lucide-react";

// app/unauthorized/page.tsx
export default function UnauthorizedPage() {
  return (
    <div className="flex gap-1 items-center justify-center min-h-screen">
      <div className=" ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-user-round-x-icon lucide-user-round-x text-red-800 w-full "
        >
          <path d="M2 21a8 8 0 0 1 11.873-7" />
          <circle cx="10" cy="8" r="5" />
          <path d="m17 17 5 5" />
          <path d="m22 17-5 5" />
        </svg>
      </div>
      <h1 className="text-3xl font-bold text-red-800">Unauthorized</h1>
    </div>
  );
}
