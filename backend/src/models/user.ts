// used to represent the user document in mongodb

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// creating a type for handling forms and for validating data before saving into db document
export type UserType = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

// add function to process the data before saving any updates into the db document
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

// create a new model from the above userSchema
const User = mongoose.model<UserType>("User", userSchema);

export default User;
