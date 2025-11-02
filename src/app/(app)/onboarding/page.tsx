const Page = () => {
  return (
    <div className="min-h-screen flex pt-12 justify-center">
      <div className="rounded-xl shadow-lg w-[900px] h-[480px] p-6 outline-2 outline-[#dce4f7]">
        {/* Header */}
        <div className="bg-[#dce4f7] text-center py-2 rounded-md mb-6">
          <h2 className="text-gray-800 font-semibold text-xl">Onboarding</h2>
        </div>

        <form>
          <div className="grid grid-cols-2 gap-4">
            {/* Name */}
            <div className="flex flex-col">
              <label htmlFor="name" className="text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Address */}
            <div className="flex flex-col">
              <label htmlFor="address" className="text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* City */}
            <div className="flex flex-col">
              <label htmlFor="city" className="text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* State */}
            <div className="flex flex-col">
              <label htmlFor="state" className="text-gray-700 mb-1">
                State
              </label>
              <input
                type="text"
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Age */}
            <div className="flex flex-col">
              <label htmlFor="age" className="text-gray-700 mb-1">
                Age
              </label>
              <input
                type="number"
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Type */}
            <div className="flex flex-col">
              <label className="text-gray-700 mb-1">Type</label>
              <label className="flex items-center gap-2 text-gray-600">
                <input type="radio" name="type" value="coach" className="text-blue-600 focus:ring-blue-500" />
                Coach
              </label>
              <label className="flex items-center gap-2 text-gray-600">
                <input type="radio" name="type" value="student" className="text-blue-600 focus:ring-blue-500" />
                Student
              </label>
            </div>
          </div>

          {/* Button */}
          <div className="text-center pt-12">
            <button
              type="submit"
              className="bg-[#1d3557] text-white px-6 py-2 rounded-lg hover:bg-[#264e86] transition-all"
            >
              Apply for Approval
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
