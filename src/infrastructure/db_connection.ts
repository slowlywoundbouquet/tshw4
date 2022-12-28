import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING!),{
    useNewUrpParser: true,
    useUnifiedTopology: true
};
const db = mongoose.connection;
db.on("open",() => {
    console.log("Connected to mongodb");
})