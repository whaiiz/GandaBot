import { isMonthValid, isDayValid } from '../../utils/date-helper.js';
import { createAnnualReminderRequest } from '../../repositories/reminders/annual-reminders-repository.js';

const commandValidations = [
    isMonthValid,
    isDayValid,
];

export const handleCreateAnnualReminder = async reminder => {
    for (const validation of commandValidations) {
        const { message, isValid } = validation(reminder);    
        if (isValid) continue;
        return { message, success: false } 
    }
    
    await createAnnualReminderRequest(reminder);
    return { success: true, message: 'Reminder created!'}
}
