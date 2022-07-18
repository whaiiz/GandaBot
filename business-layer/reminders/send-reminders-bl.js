import { getAnnualRemindersByDayAndMonthRequest } from "../../repositories/reminders/annual-reminders-repository.js";
import { getRemindersByDateRequest } from "../../repositories/reminders/reminders-repository.js";

export const handleSendReminders = async _ => {
    const todayDate = new Date();
    const reminders = await getRemindersByDateRequest(todayDate);
    const annualReminders = await getAnnualRemindersByDayAndMonthRequest(todayDate.getDate(), todayDate.getMonth() + 1);

    return {
        reminders,
        annualReminders
    }
}