import mongoose from 'mongoose';

const annualReminderSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    day: {
       type: Number,
       min : 1,
       max: 31,
       required: true 
    },
    month: {
        type: Number,
        min : 1,
        max: 12,
        required: true
    },
    discordId: {
        type: String,
        required: true
    }
}, { timestamps: true });

const AnnualReminder = mongoose.model('anualReminder', annualReminderSchema);

export default AnnualReminder;