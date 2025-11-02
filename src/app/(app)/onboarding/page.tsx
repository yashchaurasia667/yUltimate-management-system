"use client";
import axios from "axios";
import { redirect } from "next/navigation";
import React, { useState } from "react";

const Page = () => {
  const [name, setName] = useState("");
  const [address, setAdderss] = useState("");
  const [age, setAge] = useState(0);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [type, setType] = useState<"coach" | "student">("student");
  const [course, setCourse] = useState("");
  const [error, setError] = useState("");

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
      },
    }).then((res) => {
      if (res.status === 200) redirect("/");
      else setError(res.message);
    });
  };

  return (
    <form>
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label htmlFor="address">Address</label>
        <input type="text" value={address} onChange={(e) => setAdderss(e.target.value)} />
      </div>
      <div>
        <label htmlFor="age">Age</label>
        <input type="number" value={age} min={0} max={200} onChange={(e) => setAge(parseInt(e.target.value) | 0)} />
      </div>
      <div>
        <label htmlFor="city">city</label>
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
      </div>
      <div>
        <label htmlFor="state">state</label>
        <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
      </div>
      <div>
        <label htmlFor="type">Type</label>
        <label htmlFor="type">coach</label>
        <input type="radio" value={"coach"} name="type" onClick={(e) => setType("coach")} />
        <label htmlFor="type">student</label>
        <input type="radio" value={"student"} name="type" onClick={(e) => setType("student")} />
      </div>
      {type === "coach" ? (
        <div>
          <label htmlFor="course">Course</label>
          <input type="text" value={course} onChange={(e) => setCourse(e.target.value)} />
        </div>
      ) : (
        ""
      )}
      {error === "" ? "" : <div>{error}</div>}
      <button>Apply for approval</button>
    </form>
  );
};

export default Page;
