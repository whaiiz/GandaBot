import { MessageEmbed } from "discord.js";

const commandsInstructions = new MessageEmbed().setColor('#0099ff')
    .setTitle("Commands")
    .addFields(
        { name: 'Create Reminder', value: 'create-reminder dd/mm/aaaa <description>' },
        { name: 'Create Annual Reminder', value: 'create-annual-reminder dd/mm/ <description> ' },
    );

export const help = message => {
    message.author.send({ embeds: [commandsInstructions] });
}