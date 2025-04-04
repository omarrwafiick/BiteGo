import mongoose from 'mongoose';

export const ConnectDB = async (): Promise<void> => {
    try { 
        const connection = await mongoose.connect(String(process.env.MONGO_URL));
        console.log(`Connected To Mongoose: ${connection.connection.host}`);
    } catch (error) {
        console.log(`Connection Error To Mongoose: ${error}`);
        process.exit(1);
    }
};
