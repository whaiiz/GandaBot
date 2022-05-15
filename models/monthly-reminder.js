import mongoose from 'mongoose';

const monthlyReminderSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    day: {
       type: Date,
       min : 1,
       max: 31,
       required: true 
    },
    discordId: {
        type: String,
        required: true
    }
}, { timestamps: true });

const monthlyReminder = mongoose.model('monthlyReminder', monthlyReminderSchema);

export default monthlyReminder;