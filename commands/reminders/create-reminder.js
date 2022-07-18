import { handleCreateReminder } from '../../business-layer/reminders/create-reminder-bl.js' 
import { convertDateStringToDateObject, isDateValid } from '../../utils/date-helper.js';

const wrongFormatMessage = 'create-reminder format is: "createReminder <description of reminder> <dd/mm/yyyy>"';

export const createReminder = async message => {
    const { content, author : {id} } = message;
    const [, description, date] = content.split(' ');

    if (!description || !date || !isDateValid(date)) {
        message.author.send(wrongFormatMessage);
        return;
    }

    const result = await handleCreateReminder({ 
        discordId: id,
        date: convertDateStringToDateObject(date, '/'),
        description,
    });

    message.author.send(result.message);
}