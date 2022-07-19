import AnnualReminder from "../../models/annual-reminder.js"

export const createAnnualReminderRequest = async (reminder) => {
    const newReminder = new AnnualReminder(reminder);
    await newReminder.save();
}

export const getAnnualRemindersByDayAndMonthRequest = async (day, month) => {
    const result = await AnnualReminder.find({'day': day, 'month': month}).lean();
    return result;
}

export const getAnnualRemindersByDiscordIdRequest = async discordId => {
    let result = await AnnualReminder.find().lean();
    result = result.filter(r => r.discordId === discordId)
    return result;
}

export const deleteByIdRequest = async id => {
    AnnualReminder.deleteOne({ _id: id }, function (err) {
        if (err) throw new Exception("Could not delete annual reminder by id")
    });
}