import { handleCreateReminder } from '../../business-layer/reminders/create-reminder-bl.js' 
import { convertDateStringToDateObject, isDateValid } from '../../utils/date-helper.js';

const wrongFormatMessage = 'create-reminder format is: "createReminder <dd/mm/yyyy> <description of reminder>"';

const convertMessageStringToModel = messageArray => {
    try {
        let date = convertDateStringToDateObject(messageArray[1], '/');
        let description = '';

        for (let i = 2; i < messageArray.length; i++) {
            let space = messageArray.length - 1 === i ? '' : ' ';
            description += messageArray[i] + space;
        }

        return { description, date }
    } catch(ex) {
        return null
    }
}

export const createReminder = async message => {
    let { content, author : {id} } = message;
    let input = convertMessageStringToModel(content.split(' '));
    
    if (!input) {
        message.author.send(wrongFormatMessage);
        return;
    }
    
    input.discordId = id;
    let result = await handleCreateReminder(input);
    message.author.send(result.message);
}