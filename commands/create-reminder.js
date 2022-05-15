import { createReminderRequest } from '../repositories/reminders-repository.js';

const wrongFormatMessage = 'create-reminder format is: "createReminder <description of reminder> <dd/mm/yyyy>"';

const isDateValid = (dateString) =>
    dateString.match(/(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/);

const convertDateStringToDateObject = (dateString) => {
    const date = dateString.split("/");
    return new Date(date[2] + '/' + date[1] + '/' + date[0]);
}

export const createReminder = async message => {
	const contentSplited = message.content.split(' ');

    if (!contentSplited[1] || !contentSplited[2] || !isDateValid(contentSplited[2])) {
        message.author.send(wrongFormatMessage);
        return;
    }

    await createReminderRequest({ 
        discordId: message.author.id,
        date: convertDateStringToDateObject(contentSplited[2]),
        description: contentSplited[1]
    });
}