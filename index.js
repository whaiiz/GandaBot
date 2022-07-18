import { Client, Intents } from "discord.js";
import { sendReminders } from './commands/reminders/send-reminders.js';
import { createReminder } from "./commands/reminders/create-reminder.js";
import { createAnnualReminder } from "./commands/reminders/create-annual-reminder.js";
import { startDatabaseConnection, stopDatabaseConnection } from './database-connection-manager.js';
import dotenv from 'dotenv';
import cron from 'cron';

dotenv.config();

const botToken = process.env.TOKEN;

// Inserir documentação
const commands = {
	'create-reminder': createReminder,
	'create-annual-reminder': createAnnualReminder,
	'stop': stopDatabaseConnection,
}

const client = new Client({
	intents: [
		Intents.FLAGS.DIRECT_MESSAGES,
		Intents.FLAGS.DIRECT_MESSAGE_TYPING,
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES
	],
	partials: ['CHANNEL']
});

client.on("messageCreate", async message => {
	const { content } = message;
	const contentSplited = content.split(' ');
	const commandHandler = contentSplited[0] ? commands[contentSplited[0]] : false;
	
	if (!commandHandler || message.author.id === client.user.id) return;
	
	try {
		await commandHandler(message);
	} catch(ex) {
		console.log('error', ex)
	}
})

client.on('ready', _ => {
	startDatabaseConnection();
	console.log(`Ganda Bot is online`);
});

const scheduledMessage = new cron.CronJob('00 50 21 * * *', () => {
	sendReminders(client);
});
  
scheduledMessage.start()

client.login(botToken);