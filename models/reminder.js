import mongoose from 'mongoose';

const reminderSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    date: {
       type: Date,
       required: true 
    },
    discordId: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Reminder = mongoose.model('reminder', reminderSchema);

export default Reminder;