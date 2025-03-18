const mongoose = require("mongoose");
const Document = require("./Document");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["http://localhost:5173", "https://livelysync.vercel.app"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected successfully! 🚀"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const io = require("socket.io")(PORT, {
  cors: {
    origin: ["http://localhost:5173", "https://livelysync.vercel.app"],
    methods: ["GET", "POST"],
  },
});

const defaultValue = "";

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("get-document", async (documentId) => {
    const document = await findOrCreateDocument(documentId);
    socket.join(documentId);
    socket.emit("load-document", document.data);

    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });

    socket.on("save-document", async (data) => {
      await Document.findByIdAndUpdate(documentId, { data });
    });
  });
});

async function findOrCreateDocument(id) {
  if (!id) return;
  try {
    let document = await Document.findById(id);
    if (!document) {
      document = await Document.create({ _id: id, data: defaultValue });
    }
    return document;
  } catch (error) {
    console.error("Error finding or creating document:", error);
  }
}
