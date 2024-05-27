import { model, Schema } from "mongoose";
import mongoose from "mongoose";

const problemSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    description: {
      type: String,
      required: true,
    },
    feature: {
      type:String,
      required: true,
    },
    status: {
      type: String,
      default: "Open",
      enum: ["Open", "In Progress", "Resolved", "Closed"],
    },
    screenshot: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Problem = model("Problem", problemSchema);
export default Problem;
