import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to Database ${ connection.connection.host }`);
    } catch (error) {
        console.log(`${error} did not connect`);
    }
}