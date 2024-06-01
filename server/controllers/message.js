import Message from "../models/Message.js";

export const addMessage = async (req, res, next) => {
    try {
      const { from, to, message } = req.body;
      const data = await Message.create({
        message: { text: message, sender: from, users: [from, to] },
      });
      if (data) return res.json({ msg: "Message sent successfully!" });
      return res.json({ msg: "Failed to add message to the database." });
    } catch (ex) {
      console.error(error.message);
      next(ex);
    }
  };
  
  export const getAllMessage = async (req, res, next) => {
    try {
      const { from, to } = req.body;
      const messages = await Message.find({
        "message.users": {
          $all: [from, to],
        },
      }).sort({ updatedAt: 1 });
      const projectMessages = messages.map((msg) => {
        return {
          fromSelf: msg.message.sender.toString() === from,
          message: msg.message.text,
        };
      });
      res.json(projectMessages);
    } catch (error) {
      console.error(error.message);
      next(error);
    }
  };