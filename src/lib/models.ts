import mongoose from "mongoose";

export const studentDetails = new mongoose.Schema({
  approved: {
    type: Boolean,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
});
export const studentModel = mongoose.model("Student", studentDetails);

export const coachDetails = new mongoose.Schema({
  approved: {
    type: Boolean,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
});
export const coachModel = mongoose.model("Coach", coachDetails);

export const eventSchema = new mongoose.Schema({
  organizer: {
    type: [mongoose.Schema.ObjectId],
    ref: "Coach",
    required: true,
  },
  participants: {
    type: [mongoose.Schema.ObjectId],
    ref: "Student",
  },
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});
export const eventModel = mongoose.model("Event", eventSchema);
