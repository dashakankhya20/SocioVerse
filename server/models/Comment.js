import mongoose, { model, Schema } from "mongoose";

const commentSchema = new Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Post',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    content: String,
}, {
    timestamps: true
});

const Comment = model("Comment", commentSchema);
export default Comment;