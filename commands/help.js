import { MessageEmbed } from "discord.js";

const commandsInstructions = new MessageEmbed().setColor('#0099ff')
    .setTitle("Commands")
    .addFields(
        { name: 'Create Reminder', value: 'create-reminder <description> dd/mm/aaaa' },
        { name: 'Create Annual Reminder', value: 'create-annual-reminder <description> dd/mm/' },
    );

export const help = message => {
    message.author.send({ embeds: [commandsInstructions] });
}