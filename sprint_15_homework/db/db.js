import mongoose from "mongoose";

const MONGO_URL = 'mongodb://localhost:27017/site';

const connectionToDB = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log('Connected to MongoDB');
    }
    catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    };
};

export default connectionToDB;