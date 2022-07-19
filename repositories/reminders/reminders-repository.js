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

export const getRemindersByDiscordIdRequest = async discordId => {
    let result = await Reminder.find().lean();
    result = result.filter(r => r.discordId === discordId)
    return result;
}

export const deleteRemindersByDateRequest = async date => {
    await Reminder.deleteOne({ date: date }, function (err) {
        if (err) throw new Exception("Could not delete reminder by date")
    });
}

export const deleteByIdRequest = async id => {
    await Reminder.deleteOne({ _id: id }, function (err) {
        if (err) throw new Exception("Could not delete reminder by id")
    });
}