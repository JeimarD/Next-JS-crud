import mongoose from "mongoose";

const URI_MONGO = process.env.URI_MONGO;

const dbConnect = async () => {
  try {
    await mongoose.connect(URI_MONGO, {
      bufferCommands: false,
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default dbConnect;
