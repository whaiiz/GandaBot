import { handleCreateAnnualReminder } from '../../business-layer/reminders/create-annual-reminder-bl.js';

const wrongMessageFormat = 'create-annual-reminder format is: "create-annual-reminder <dd/mm> <description>"';

const getDayAndMonth = (date) => {
    let [day, month] = date.split('/');

    day = parseInt(day);
    month = parseInt(month);

    return { day, month }
}

const convertMessageStringToModel = messageArray => {
    try {
        let { day, month } = getDayAndMonth(messageArray[1]);
        let description = '';

        for (let i = 2; i < messageArray.length; i++) {
            let space = messageArray.length - 1 === i ? '' : ' ';
            description += messageArray[i] + space;
        }

        return { description, day, month }
    } catch(ex) {
        return null
    }
}

export const createAnnualReminder = async message => {
    let { content, author: {id} } = message;
    let input = convertMessageStringToModel(content.split(' '))

    if (!input) {
        message.author.send(wrongMessageFormat);
        return;
    } 

    input.discordId = id;
    let result = await handleCreateAnnualReminder(input)
    message.author.send(result.message);
}
