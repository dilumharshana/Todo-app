import mongoose from 'mongoose';

// create database connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Databse Connected: ${conn.connection.host}`);
  } catch (error) {
    throw new Error(`Database connection failed! \n${error.message}`);
  }
};
 export default connectDB;