import { Conversation } from "../models/Conversation.js";

//controller functions for one one conversation
// Create a conversation between two users
export const createOneOnOneConversation = async (req, res) => {
  try {
    const { participants } = req.body;
    const type = "one-on-one";
    const newConversation = await Conversation.create({ participants, type });
    res.status(201).json(newConversation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// get conversations between two users
export const getOneOnOneConversations = async (req, res) => {
  try {
    const { userId1, userId2 } = req.params;
    const conversations = await Conversation.find({
      participants: { $all: [userId1, userId2], $size: 2 },
      type: "one-on-one",
    });
    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// functions same for both type
export const filterConversations = async (req, res) => {
  try {
    const { searchText } = req.query;
    // Search for conversations where groupName or participants' names contain the search text
    const conversations = await Conversation.find({
      $or: [
        { groupName: { $regex: searchText, $options: "i" } }, // Case-insensitive search for groupName
        { "participants.name": { $regex: searchText, $options: "i" } }, // Case-insensitive search for participants' names
      ],
    });
    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// controller functions for group conversations

// Create a group conversation
export const createGroupConversation = async (req, res) => {
  try {
    const { participants, groupName } = req.body;
    const type = "group";
    const newConversation = await Conversation.create({
      participants,
      groupName,
      type,
    });
    res.status(201).json(newConversation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all group conversations by group name
export const getAllGroupConversations = async (req, res) => {
  try {
    const { groupName } = req.params;
    const conversations = await Conversation.find({ groupName, type: "group" });
    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a message from a one-on-one conversation
export const deleteMessage = async (req, res) => {
  try {
    const { conversationId, messageId } = req.params;

    // Find the conversation by ID
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    // Find the message by ID within the conversation
    const message = conversation.messages.find(
      (msg) => msg._id.toString() === messageId
    );
    if (!message) {
      return res
        .status(404)
        .json({ message: "Message not found in the conversation" });
    }

    // Remove the message from the conversation
    conversation.messages.pull({ _id: messageId });

    // Save the updated conversation
    await conversation.save();

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Send a message in a conversation
export const sendMessage = async (req, res) => {
  try {
    const { conversationId, senderId, text } = req.body;

    // Find the conversation by ID
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    // Add the new message to the conversation
    conversation.messages.push({ sender: senderId, text });

    // Save the updated conversation
    await conversation.save();

    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};