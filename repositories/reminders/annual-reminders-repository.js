import AnnualReminder from "../../models/annual-reminder.js"

export const createAnnualReminderRequest = async (reminder) => {
    const newReminder = new AnnualReminder(reminder);
    await newReminder.save();
}

export const getAnnualRemindersByDayAndMonthRequest = async (day, month) => {
    const result = await AnnualReminder.find({'day': day, 'month': month}).lean();
    return result;
}