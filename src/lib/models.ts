import mongoose from "mongoose";

// export const studentDetails = new mongoose.Schema({
//   approved: {
//     type: Boolean,
//     required: true,
//   },
//   name: {
//     type: String,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   age: {
//     type: Number,
//     required: true,
//   },
//   address: {
//     type: String,
//     required: true,
//   },
//   city: {
//     type: String,
//     required: true,
//   },
//   state: {
//     type: String,
//     required: true,
//   },
// });
// export const studentModel =mongoose.models.Student || mongoose.model("Student", studentDetails);

export const accountDetails = new mongoose.Schema({
  approved: {
    type: Boolean,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  // password: {
  //   type: String,
  //   required: false,
  // },
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
  type: {
    type: String,
    required: true,
    enum: ["student", "coach"],
  },
  course: {
    type: String,
    required: function () {
      return this.type === "coach";
    },
  },
  profile: {
    type: String,
    required: false,
  },
  events: {
    type: [mongoose.Schema.ObjectId],
    required: false,
  },
});
export const accountModel = mongoose.models.Account || mongoose.model("Account", accountDetails);

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
    type: String,
    required: true,
  },
  banner: {
    type: String,
    required: true
  },
  venue: {
    type: String,
    required: true,
  },
});
export const eventModel = mongoose.models.Event || mongoose.model("Event", eventSchema);

export const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  members: {
    type: [mongoose.Schema.ObjectId],
    required: true,
  },
});
