import mongoose from "mongoose";
const { Schema, model } = mongoose;

const conversationSchema = new Schema({
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  groupName: {
    type: String,
    default: null, // Default value for groupName (null for one-on-one conversations)
    required: function() {
      return this.participants.length > 2; // Required for group conversations
    }
  },
  type: {
    type: String,
    enum: ['one-on-one', 'group'], // Possible values for conversation type
    required: true
  },
  messages: [{
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    text: {
      type: String,
      required: true
    }
  }],
  deleted: {
    type: Boolean,
    default: false // Set to true when conversation is soft deleted
  }
}, {
  timestamps: true
});

export const Conversation = model('Conversation', conversationSchema);
