"use client";
import axios from "axios";
import { redirect } from "next/navigation";
import React, { useState } from "react";

const Page = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState(0);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [type, setType] = useState<"coach" | "student">("student");
  const [course, setCourse] = useState("");
  const [error, setError] = useState("");

  const inputStyle = "border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none";
  const labelStyle = "text-gray-700 mb-1 font-semibold text-lg";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: "/api/onboarding",
      data: {
        name: name,
        // password: password,
        age: age,
        address: address,
        city: city,
        state: state,
        type: type,
        course: course,
      },
    }).then((res) => {
      if (res.status === 200) redirect("/");
      else {
        console.log(res.data);
        setError(res.data.message);
      }
    });
  };

  return (
    <div className="min-h-screen flex pt-12 justify-center">
      <div className="rounded-xl shadow-lg max-w-7xl w-full max-h-fit p-6 outline-2 outline-[#dce4f7]">
        {/* Header */}
        <div className="bg-[#dce4f7] text-center py-2 rounded-md mb-6">
          <h2 className="text-gray-800 font-semibold text-3xl">Onboarding</h2>
        </div>

        <form onSubmit={submit}>
          <div className="grid grid-cols-2 gap-4">
            {/* Name */}
            <div className="flex flex-col">
              <label htmlFor="name" className={labelStyle}>
                Name
              </label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputStyle} />
            </div>

            {/* Address */}
            <div className="flex flex-col">
              <label htmlFor="address" className={labelStyle}>
                Address
              </label>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className={inputStyle} />
            </div>

            {/* City */}
            <div className="flex flex-col">
              <label htmlFor="city" className={labelStyle}>
                City
              </label>
              <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className={inputStyle} />
            </div>

            {/* State */}
            <div className="flex flex-col">
              <label htmlFor="state" className={labelStyle}>
                State
              </label>
              <input type="text" value={state} onChange={(e) => setState(e.target.value)} className={inputStyle} />
            </div>

            {/* Age */}
            <div className="flex flex-col">
              <label htmlFor="age" className={labelStyle}>
                Age
              </label>
              <input
                type="number"
                min={0}
                max={200}
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value) | 0)}
                className={inputStyle}
              />
            </div>

            {/* Type */}
            <div className="flex flex-col">
              <label className="text-gray-700 mb-1 font-semibold">Type</label>
              <label className="flex items-center gap-2 text-gray-600">
                <input
                  type="radio"
                  name="type"
                  value="coach"
                  className="text-blue-600 focus:ring-blue-500"
                  onClick={() => setType("coach")}
                />
                Coach
              </label>
              <label className="flex items-center gap-2 text-gray-600">
                <input
                  type="radio"
                  name="type"
                  value="student"
                  className="text-blue-600 focus:ring-blue-500"
                  onClick={() => setType("student")}
                />
                Student
              </label>
            </div>
          </div>

          {type === "coach" ? (
            <div className="flex flex-col">
              <label htmlFor="course" className={labelStyle}>
                Course
              </label>
              <input type="text" value={course} onChange={(e) => setCourse(e.target.value)} className={inputStyle} />
            </div>
          ) : (
            ""
          )}

          {error === "" ? "" : <div>{error}</div>}

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
