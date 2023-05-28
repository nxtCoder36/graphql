import mongoose from "mongoose";

const conn = mongoose.createConnection(process.env.MONGO_URI)
export const tododb = conn.useDb("todo")