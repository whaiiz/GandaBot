import { Client, Intents } from "discord.js";
import dotenv from 'dotenv';

dotenv.config()

const botToken = process.env.TOKEN;

const client = new Client({
	intents: [
		Intents.FLAGS.DIRECT_MESSAGES,
		Intents.FLAGS.DIRECT_MESSAGE_TYPING,
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES
	],
	partials: ['CHANNEL']
});

client.on("messageCreate", message => {
	if (message.content === 'ping') {
		message.author.send("pong");
	}
})

client.on('ready', _ => {
	console.log(`Ganda Bot is online`);
});

client.login(botToken)
