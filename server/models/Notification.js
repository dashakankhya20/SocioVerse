import mongoose, { model, Schema } from "mongoose";

const notificationSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    type: String,
    content: String,
    isRead: { type: Boolean, default: false}
}, {
    timestamps: true
});

const Notification = model("Notification", notificationSchema);
export default Notification;