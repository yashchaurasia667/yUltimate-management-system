"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { CheckCircle, XCircle, Users, BookOpen } from "lucide-react";

interface UserBase {
  _id: string; // Add this line - MongoDB ID
  name: string;
  age: number;
  address: string;
  city: string;
  state: string;
}

interface Student extends UserBase {
  type: "student";
}

interface Coach extends UserBase {
  type: "coach";
  course: string;
}

type UserType = Student | Coach;

interface UserCardProps {
  user: UserType;
  handleApproval: (id: string, userType: "student" | "coach", action: "approve" | "reject") => Promise<void>;
}

// --- Mock Data (with _id added) ---
const mockStudents: Student[] = [
  {
    _id: "student1",
    name: "Alice Johnson",
    age: 22,
    address: "123 Oak St",
    city: "Springfield",
    state: "IL",
    type: "student",
  },
  {
    _id: "student2",
    name: "Bob Smith",
    age: 19,
    address: "45 Pine Ln",
    city: "Shelbyville",
    state: "KY",
    type: "student",
  },
];

const mockCoaches: Coach[] = [
  {
    _id: "coach1",
    name: "Dr. Charlie Brown",
    age: 45,
    address: "78 Elm Rd",
    city: "Capital City",
    state: "NY",
    type: "coach",
    course: "Advanced Theoretical Physics",
  },
  {
    _id: "coach2",
    name: "Eva Mendes",
    age: 30,
    address: "90 Maple Ave",
    city: "Metro City",
    state: "CA",
    type: "coach",
    course: "Frontend Web Development",
  },
];

const UserCard: React.FC<UserCardProps> = ({ user, handleApproval }) => {
  const isCoach = user.type === "coach";

  return (
    <div className="bg-white p-5 border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-bold text-[#1d3557] mb-1">{user.name}</h3>
        <p className="text-sm text-gray-500 mb-3">{user.type.charAt(0).toUpperCase() + user.type.slice(1)}</p>

        <div className="space-y-1 text-gray-700 text-sm">
          <p>
            <strong>Age:</strong> {user.age}
          </p>
          <p>
            <strong>Location:</strong> {user.city}, {user.state}
          </p>
          <p className="truncate">
            <strong>Address:</strong> {user.address}
          </p>
          {/* Optional: Display ID for debugging */}
          <p className="text-xs text-gray-400 truncate">
            <strong>ID:</strong> {user._id}
          </p>
        </div>

        {isCoach && (
          <p className="mt-3 bg-[#f1faee] p-2 rounded-lg text-[#457b9d] font-semibold text-sm border border-[#457b9d]/30">
            <BookOpen className="inline h-4 w-4 mr-1 mb-0.5" />
            {(user as Coach).course}
          </p>
        )}
      </div>

      <div className="mt-4 flex gap-3">
        <button
          onClick={() => handleApproval(user._id, user.type, "approve")}
          className="flex-1 flex items-center justify-center gap-1 bg-[#2a9d8f] text-white py-2 rounded-lg text-sm font-semibold hover:bg-[#218074] transition-colors shadow-md"
        >
          <CheckCircle className="h-4 w-4" /> Approve
        </button>
        <button
          onClick={() => handleApproval(user._id, user.type, "reject")}
          className="flex-1 flex items-center justify-center gap-1 bg-[#e76f51] text-white py-2 rounded-lg text-sm font-semibold hover:bg-[#c95d43] transition-colors shadow-md"
        >
          <XCircle className="h-4 w-4" /> Reject
        </button>
      </div>
    </div>
  );
};

// --- Main Component ---
const App = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"students" | "coaches">("students");
  const [actionMessage, setActionMessage] = useState<{ type: string; message: string } | null>(null);

  // Function to fetch data from APIs
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        // Using Promise.allSettled to handle individual API failures better
        const [studentsResult, coachesResult] = await Promise.allSettled([
          axios.get("/api/getAllstudents").then((res) => res.data),
          axios.get("/api/getAllcoaches").then((res) => res.data),
        ]);

        const studentsData =
          studentsResult.status === "fulfilled" && Array.isArray(studentsResult.value)
            ? studentsResult.value
            : mockStudents;

        const coachesData =
          coachesResult.status === "fulfilled" && Array.isArray(coachesResult.value)
            ? coachesResult.value
            : mockCoaches;

        // Validate that the data has _id fields
        const validatedStudents = studentsData.map((student: any, index: number) => ({
          ...student,
          _id: student._id || `mock-student-${index}`, // Fallback ID if missing
        }));

        const validatedCoaches = coachesData.map((coach: any, index: number) => ({
          ...coach,
          _id: coach._id || `mock-coach-${index}`, // Fallback ID if missing
        }));

        setStudents(validatedStudents.length > 0 ? validatedStudents : mockStudents);
        setCoaches(validatedCoaches.length > 0 ? validatedCoaches : mockCoaches);

        if (studentsResult.status === "rejected" || coachesResult.status === "rejected") {
          setError("Could not retrieve all data. Using fallback data.");
        }
      } catch (e) {
        setError("Could not retrieve data. Displaying mock data." + e);
        setStudents(mockStudents);
        setCoaches(mockCoaches);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to handle approval/rejection logic
  const handleApproval = async (id: string, userType: "student" | "coach", action: "approve" | "reject") => {
    setActionMessage(null);
    console.log("Processing user ID:", id);

    const isCoach = userType === "coach";
    const userTypeLabel = isCoach ? "Coach" : "Student";
    const approvedStatus = action === "approve";
    const actionLabel = approvedStatus ? "approved" : "rejected";

    const payload = {
      id: id,
      type: userType,
      approved: approvedStatus,
    };

    try {
      await axios.post("/api/updateApprove", payload);

      // Optional: Add a small delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Update local state by removing the processed user
      if (isCoach) {
        setCoaches((prev) => prev.filter((coach) => coach._id !== id));
      } else {
        setStudents((prev) => prev.filter((student) => student._id !== id));
      }

      setActionMessage({
        type: "success",
        message: `${userTypeLabel} has been ${actionLabel} successfully.`,
      });
    } catch (e) {
      setActionMessage({
        type: "error",
        message: `Failed to ${actionLabel} ${userTypeLabel}. Please try again.`,
      });
      console.error("Approval error:", e);
    }
  };

  const renderContent = (data: UserType[], type: "students" | "coaches") => {
    if (loading) {
      return (
        <div className="text-center py-10 text-gray-500">
          <svg className="animate-spin h-6 w-6 mr-3 inline text-[#1d3557]" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading pending users...
        </div>
      );
    }

    if (data.length === 0) {
      return (
        <div className="text-center py-16 text-gray-500 border-dashed border-2 border-gray-300 rounded-lg m-4">
          <p className="font-semibold text-lg">No pending {type} for approval.</p>
          <p className="text-sm mt-1">Great job! All users are up to date.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {data.map((user) => (
          <UserCard key={user._id} user={user} handleApproval={handleApproval} />
        ))}
      </div>
    );
  };

  const studentCount = students.length;
  const coachCount = coaches.length;

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#1d3557] p-6 text-white text-center">
          <h1 className="text-3xl font-extrabold tracking-tight">User Approval Center</h1>
          <p className="text-sm opacity-90 mt-1">Review and manage pending registrations for students and coaches.</p>
        </div>

        {/* Action Message Bar */}
        {actionMessage && (
          <div
            className={`p-4 text-center font-medium ${
              actionMessage.type === "success" ? "bg-[#a7d3c9] text-[#2a9d8f]" : "bg-red-100 text-red-600"
            }`}
          >
            {actionMessage.message}
            <button
              onClick={() => setActionMessage(null)}
              className="ml-4 text-sm font-semibold opacity-75 hover:opacity-100 transition-opacity"
            >
              (Dismiss)
            </button>
          </div>
        )}
        {error && <div className="p-3 text-center bg-yellow-100 text-yellow-700 font-medium">{error}</div>}

        {/* Tabs Navigation */}
        <div className="flex border-b border-gray-200 bg-gray-50">
          <button
            onClick={() => setActiveTab("students")}
            className={`flex-1 py-4 px-4 text-lg font-semibold flex items-center justify-center gap-2 transition-all ${
              activeTab === "students"
                ? "text-[#1d3557] border-b-4 border-[#1d3557] bg-white"
                : "text-gray-500 hover:text-[#457b9d]"
            }`}
          >
            <Users className="h-5 w-5" />
            Students ({studentCount})
          </button>
          <button
            onClick={() => setActiveTab("coaches")}
            className={`flex-1 py-4 px-4 text-lg font-semibold flex items-center justify-center gap-2 transition-all ${
              activeTab === "coaches"
                ? "text-[#1d3557] border-b-4 border-[#1d3557] bg-white"
                : "text-gray-500 hover:text-[#457b9d]"
            }`}
          >
            <BookOpen className="h-5 w-5" />
            Coaches ({coachCount})
          </button>
        </div>

        {/* Content Area */}
        <div className="p-4 min-h-[500px]">
          {activeTab === "students" && renderContent(students, "students")}
          {activeTab === "coaches" && renderContent(coaches, "coaches")}
        </div>
      </div>
    </div>
  );
};

export default App;
