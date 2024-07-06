import "dotenv/config";

import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";
import path from "path";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5173",
  },
});

const __dirname1 = path.resolve();

app.use(express.static(path.join(__dirname1, "/frontend/dist")));

app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname1, "frontend", "dist", "index.html"))
);

io.on("connection", async (socket) => {
  socket.on("setup", ({ id }) => {
    socket.join(id);
    socket.emit("joined", id);
  });

  socket.on("code: change", ({ value, id }) => {
    socket.broadcast.emit("code: new", { value, user: id });
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
