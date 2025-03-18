const mongoose = require("mongoose");
const Document = require("./Document")
const dotenv=require("dotenv");
dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB connected successfully! 🚀"))
    .catch((err) => console.error("MongoDB connection error:", err));


const io = require("socket.io")(process.env.PORT, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});
const defaultValue="";
io.on("connection", (socket) => {
    console.log("connected");

    socket.on("get-document", async(documentId) => {
        const document =await findOrCreateDocument(documentId);
        socket.join(documentId);
        socket.emit("load-document", document.data);

        socket.on("send-changes", (delta) => {
            socket.broadcast.to(documentId).emit("receive-changes", delta);
        });
        socket.on("save-document",async data=>{
            await Document.findByIdAndUpdate(documentId,{data});
        })
    });
});
async function findOrCreateDocument(id){
    if(!id){
        return;
    }
    const document= await Document.findById(id);
    if(document){
        return document;
    }
    else{
        return await Document.create({_id:id,data:defaultValue});
    }
}