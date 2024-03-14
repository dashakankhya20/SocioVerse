// routes/conversationRoutes.js

import express from 'express';
import { 
  createOneOnOneConversation,
  getOneOnOneConversations,
  filterConversations,
  createGroupConversation,
  getAllGroupConversations,
  deleteMessage,
  sendMessage
} from '../controllers/conversation.js';

const router = express.Router();

// Routes for one-on-one conversations
router.post('/one-on-one', createOneOnOneConversation);
router.get('/one-on-one/:userId1/:userId2', getOneOnOneConversations);

// Routes for group conversations
router.post('/group', createGroupConversation);
router.get('/group/:groupName', getAllGroupConversations);

// Route for filtering conversations
router.get('/filter', filterConversations);

// Route for deleting a message from a conversation
router.delete('/:conversationId/messages/:messageId', deleteMessage);

//Route for sending a message
router.post("/send", sendMessage);

export default router;
