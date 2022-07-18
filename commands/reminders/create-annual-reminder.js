import { handleCreateAnnualReminder } from '../../business-layer/reminders/create-annual-reminder-bl.js';

const wrongMessageFormat = 'create-reminder-every-month format is: "createReminder <description of reminder> <dd/mm>"';

const convertMessageStringToModel = (description, date, discordId) => {
    let [day, month] = date.split('/');

    day = parseInt(day);
    month = parseInt(month);

    return {
        discordId,
        day,
        month,
        description
    }    
}

export const createAnnualReminder = async message => {
    const { content, author: {id} } = message;
    const [, description, date] = content.split(' ');
    
    if (!description || !date) message.author.send(wrongMessageFormat);

    const result = await handleCreateAnnualReminder(convertMessageStringToModel(description, date, id));

    message.author.send(result.message);
}
