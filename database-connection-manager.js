import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

export const startDatabaseConnection = () => {
    console.log('connected to database');
    const connectionString = process.env.CONNECTION_STRING;
    mongoose.connect(connectionString);
}

export const stopDatabaseConnection = () => {
    console.log('connected turned off');
    mongoose.connection.close();
}