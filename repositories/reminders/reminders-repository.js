import Reminder from "../../models/reminder.js";
import { areDatesEqualWithoutHour, convertDateStringToDateObject } from "../../utils/date-helper.js";

export const createReminderRequest = async (reminder) => {
    let newReminder = new Reminder(reminder);
    await newReminder.save();
}

export const getRemindersByDateRequest = async date => {
    let result = await Reminder.find().lean();
    result = result.filter(r => areDatesEqualWithoutHour(new Date(r.date), date))
    return result;
}