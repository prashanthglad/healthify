import mongoose from "mongoose";

// MongoDB Connection
export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://harishp400292:PsZYFs82bupVaQRe@cluster0.j9p0z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection failed: ", error);
    process.exit(1);
  }
};
connectDB();

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const User = mongoose.model("User", userSchema);
