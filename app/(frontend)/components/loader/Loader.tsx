"use client"
const Loader = () => {
  return (
        <div className=" fixed top-0 w-screen z-1 backdrop-blur-xs bg-transparent flex h-screen items-center justify-center ">
      <div className="flex flex-col items-center space-y-4">
        <div className="h-12 w-12 animate-spin  rounded-full border-4 border-blue-500 border-t-transparent"></div>
        <p className="text-lg font-medium text-gray-600">Please Wait...</p>
      </div>
    </div>
  )
}

export default Loader