"use client";
import { useState } from "react";
// Removed: import { useRouter } from "next/navigation";
import axios from "axios";

type payloadType = {
  name: string;
  age: number;
  address: string;
  city: string;
  state: string;
  course?: string;
  type: "coach" | "student";
};

const Page = () => {
  // Removed: const router = useRouter();

  // State variables, fixing the typo for setAddress
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState<string>("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [type, setType] = useState<"coach" | "student">("student");
  const [course, setCourse] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const inputStyle = "border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none";
  const labelStyle = "text-gray-700 mb-1 font-semibold text-lg";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Basic client-side validation
    if (!name || !address || !city || !state || !age || (type === "coach" && !course)) {
      setError("Please fill out all required fields.");
      setLoading(false);
      return;
    }

    // Prepare data payload
    const payload: payloadType = {
      name: name,
      age: parseInt(age, 10), // Convert age to number
      address: address,
      city: city,
      state: state,
      type: type,
    };

    // Conditionally add course for coaches
    if (type === "coach") {
      payload.course = course;
    } else {
      payload.course = "blah blah";
    }

    try {
      const res = await axios({
        method: "POST",
        url: "/api/onboarding",
        data: payload,
      });

      if (res.status === 200) {
        // Replaced router.push with standard window navigation for compatibility
        window.location.href = "/";
      } else {
        // Handle non-200 responses if the API sends meaningful error codes
        setError(res.data?.message || "An unknown error occurred during submission.");
      }
    } catch (err) {
      // Handle network or request errors
      // Use err.message for generic errors if response is undefined
      if (err instanceof Error) setError(err.message || "Failed to connect to the API.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex pt-12 justify-center bg-gray-50">
      <div className="rounded-xl shadow-2xl bg-white w-[90%] max-w-[900px] p-8 mt-12 mb-12 border-4 border-[#dce4f7]">
        {/* Header */}
        <div className="bg-[#1d3557] text-white text-center py-3 rounded-t-lg mb-8 shadow-md">
          <h2 className="font-extrabold text-2xl tracking-wide">User Onboarding</h2>
        </div>

        <form onSubmit={submit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="flex flex-col">
              <label htmlFor="name" className="text-gray-700 mb-1 font-medium">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#457b9d] transition duration-150"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Age */}
            <div className="flex flex-col">
              <label htmlFor="age" className="text-gray-700 mb-1 font-medium">
                Age
              </label>
              <input
                id="age"
                type="number" // Changed to type="number" for age input
                min="1"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#457b9d] transition duration-150"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>

            {/* Address */}
            <div className="flex flex-col">
              <label htmlFor="address" className="text-gray-700 mb-1 font-medium">
                Address Line
              </label>
              <input
                id="address"
                type="text"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#457b9d] transition duration-150"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            {/* City */}
            <div className="flex flex-col">
              <label htmlFor="city" className="text-gray-700 mb-1 font-medium">
                City
              </label>
              <input
                id="city"
                type="text"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#457b9d] transition duration-150"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>

            {/* State */}
            <div className="flex flex-col">
              <label htmlFor="state" className="text-gray-700 mb-1 font-medium">
                State/Province
              </label>
              <input
                id="state"
                type="text"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#457b9d] transition duration-150"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </div>

            {/* Type (Radio Group) */}
            <div className="flex flex-col pt-2">
              <label className="text-gray-700 mb-2 font-medium">Account Type</label>
              <div className="flex gap-8">
                <label className="flex items-center gap-2 text-gray-700 cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value="coach"
                    checked={type === "coach"}
                    onChange={() => setType("coach")}
                    className="text-[#457b9d] focus:ring-[#457b9d] h-4 w-4"
                  />
                  Coach
                </label>
                <label className="flex items-center gap-2 text-gray-700 cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value="student"
                    checked={type === "student"}
                    onChange={() => setType("student")}
                    className="text-[#457b9d] focus:ring-[#457b9d] h-4 w-4"
                  />
                  Student
                </label>
              </div>
            </div>

            {/* Conditional Course Input for Coach */}
            {type === "coach" && (
              <div className="flex flex-col md:col-span-2">
                <label htmlFor="course" className="text-gray-700 mb-1 font-medium">
                  Course/Expertise
                </label>
                <input
                  id="course"
                  type="text"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#457b9d] transition duration-150"
                  placeholder="e.g., Advanced Calculus, Full Stack Development"
                  required={type === "coach"}
                />
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-600 bg-red-100 border border-red-300 p-3 rounded-lg mt-4 text-center font-medium">
              {error}
            </div>
          )}

          {/* Button */}
          <div className="text-center pt-8">
            <button
              type="submit"
              disabled={loading}
              className={`w-full md:w-auto bg-[#1d3557] text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg transition-all transform hover:scale-105 ${
                loading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#457b9d]"
              }`}
            >
              {loading ? "Applying..." : "Apply for Approval"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
