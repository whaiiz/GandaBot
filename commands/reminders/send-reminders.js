import { MessageEmbed } from "discord.js";
import { handleSendReminders } from "../../business-layer/reminders/send-reminders-bl.js";

const groupByKey = (list, key) => list.reduce((hash, obj) => ({...hash, [obj[key]]:( hash[obj[key]] || [] ).concat(obj)}), {})

const sendAnnualRemindersMessage = (client, annualReminders) => {
    let todayDate = new Date();
    let remindersGroupedByDiscordId = groupByKey(annualReminders, 'discordId');
    let messageTitle = `Annual Reminders for ${todayDate.getDate()}/${todayDate.getMonth() + 1}`;
    
    Object.entries(remindersGroupedByDiscordId).forEach(([discordId, userReminders]) => {
        let content = '';
        
        for (let { description } of userReminders) {
            content += description + '\n';
        }
        
        sendMessage(client, messageTitle, content, discordId);
    });
    
}

const sendRemindersMessage = (client, reminders) => {
    let todayDate = new Date();
    let remindersGroupedByDiscordId = groupByKey(reminders, 'discordId');
    let messageTitle = `Reminders for ${todayDate.getDate()}/${todayDate.getMonth() + 1}/${todayDate.getFullYear()}`;
    
    Object.entries(remindersGroupedByDiscordId).forEach(([discordId, userReminders]) => {
        let content = '';
        
        for (let { description } of userReminders) {
            content += description + '\n';
        }
        
        sendMessage(client, messageTitle, content, discordId);
    });
}

const sendMessage = async (client, title, content, discordId) => {
    let user = await client.users.fetch(discordId).catch(() => null);
    let exampleEmbed = new MessageEmbed().setColor('#0099ff')
        .setTitle(title)
        .setDescription(content)
    
    await user.send({ embeds: [exampleEmbed] }).catch(() => {
        console.log(`Cannot send message to user with discord id ${discordId}!`);
    });
    
    if (!user) { 
        console.log(`User with discord id ${discordId} not found!`);
        return;
    }
}

export const sendReminders = async (client) => {
    const { reminders, annualReminders } = await handleSendReminders();
    sendRemindersMessage(client, reminders);
    sendAnnualRemindersMessage(client, annualReminders)
}