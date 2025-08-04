import mongoose, {Schema, Document, mongo} from "mongoose";

export interface IUser {
  username: string;
  email: string;
  password: string;
  profileImage?: string;
}

export interface IUserDocument extends IUser, mongoose.Document{
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}


const userSchema = new Schema<IUserDocument>(
  {
    username: {type: String, required:true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: {type: String, default: ""}
  },
  { timestamps: true }
);

export const User = mongoose.model<IUserDocument>("User", userSchema);
