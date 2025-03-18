const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer();
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("connected");
    socket.on("send-changes",delta=>{
        console.log(delta);
        
    })
});

server.listen(3001, () => {
    console.log("Socket.io server running on port 3001");
});
