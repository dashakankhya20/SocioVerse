import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import conversationRoutes from "./routes/conversation.js";
import problemRoutes from "./routes/problem.js";
import messageRoutes from "./routes/message.js";
import { register } from "./controllers/auth.js";
import { verifyToken } from "./middlewares/auth.js";
import { createPost } from "./controllers/posts.js";
import { Server } from "socket.io";

// CONFIGURATIONS
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// FILE STORAGE (taken from github repo of the package)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// ROUTES WITH FILES
//so here the picture will be uploaded locally before the user is registered
//here .picture should be there instead of picturePath
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);
// app.post("/problems", verifyToken, upload.single("picture"), submitProblemReport)
// app.post("/report-submit/:userId", verifyToken, upload.single("screenshot"), submitProblemReport);


// ROUTES
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);
app.use("/conversation", conversationRoutes);
app.use("/problems", problemRoutes);
app.use("/messages", messageRoutes);

// MONGOOSE SETUP
const PORT = process.env.PORT;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connected!");
  })
  .catch((error) => {
    console.log(`${error} did not connect!`);
  });

  const server = app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });

  const io = new Server(server, {
    cors:{
      //origin:"http://localhost:3000",
      origin:"https://socioverse-fe.onrender.com",
      credentials:true
    }
  })

global.onlineUsers = new Map();

const emitOnlineUsers = () => {
  io.emit("online-users", Array.from(onlineUsers.keys()));
};

io.on("connection", (socket) => {
  global.chatSocket = socket;
  console.log("New socket connection:", socket.id);

  socket.on("add-user", (userId) => {
    console.log(`User ${userId} connected with socket ID ${socket.id}`);
    onlineUsers.set(userId, socket.id);
    emitOnlineUsers();
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    console.log(`Message from ${data.from} to ${data.to}: ${data.message}`);
    if (sendUserSocket) {
      console.log(`Sending message to user ${data.to} via socket ${sendUserSocket}`);
      socket.to(sendUserSocket).emit("msg-receive", data.message);
    }
  });

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected`);
    for (let [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        emitOnlineUsers();
        break;
      }
    }
  });
});