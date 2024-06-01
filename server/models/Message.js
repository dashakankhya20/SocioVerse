import mongoose, {model, Schema } from "mongoose";

const messageSchema = new Schema(
    {
      message: {
        text: {
          type: String,
          required: true,
        },
        users: {
          type: Array,
          required: true,
        },
        sender: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
      },
    },
    { timestamps: true }
  );
  
  const Message = model("Message", messageSchema);
  export default Message;