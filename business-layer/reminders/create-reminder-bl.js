import { createReminderRequest } from '../../repositories/reminders/reminders-repository.js';

export const handleCreateReminder = async reminder => {
    await createReminderRequest(reminder);
    return { success: true, message: 'Reminder created!'}
}