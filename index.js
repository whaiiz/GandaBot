const Discord = require('discord.js') // discord.js é um modulo de node.js que permite interagir com a Discord API facilmente.
var mysql = require('mysql'); // modulo mysql

const bot = new Discord.Client(); // declarar o objeto bot

const token = 'NjMzMzc4MDA2NjU5NzYwMTM4.XaTn6Q.yLdCezChwPAvJrO_EBILnUrBlbI'; // token do bot

const con = mysql.createConnection({ // object to connect to database
  host: "localhost",
  user: "root",
  password: "",
  database: "gandabotdb"
});

function hasOperator(message){ // function to see if a sentence or a character has or is a operator
    if(message.includes('+') || message.includes('-') || message.includes(':') || message.includes('*'))
        return true;
}

bot.on('ready', () => { // when bots bootup
	console.log('Ganda BOT está online');
});

bot.on('message', message => {
  // Voice only works in guilds, if the message does not come from a guild,
  // we ignore it

	if (!message.guild) return;

  	if(message.content.toLowerCase() === "olá" || message.content.toLowerCase() === "ola" ){
		message.reply('olá.');
	}
	if(message.content.toLowerCase() === "adeus"){
		message.reply('adeus.');
	}
    if(message.content.toLowerCase() === "tudo bem?"){
		message.reply('Sim e contigo?');
	}
    if(message.content.toLowerCase() === "sexo"){
		message.channel.send('Fogo, já não fodo desde de a última década, apaga-me o fogo xau.');
	}

    
	if(message.content[0] === '/' && hasOperator(message.content) === true){ // verifiy if the message has '/' as first character and contains an operator
        var num1 = 0 , num2 = 0, result = 0, operation; // variable to make the account
        num1 = parseInt(message.content[1]); // init num1 to the second char of the message content
		for(var i = 2 ; hasOperator(message.content[i]) != true ; i++){ // cycle only ends when its finds a operator 
            num1 = (num1 * 10) + parseInt(message.content[i]); // adds a decimal number to the variable
        }
		operation = message.content[i]; //inits operation 
		i++; // increments to go the next number
		num2 = parseInt(message.content[i]); // and inits number 	
		for(var i = message.content.indexOf(operation) + 2 ; i < message.content.length; i++){ // only ends when it got to the end of the message
			num2 = (num2 * 10) + parseInt(message.content[i]); // adds a decimal number to the variable
		}
        switch(operation){ //search what operation was
			case '+':
				result = parseInt(num1) + parseInt(num2);
				break;
			case '-':
				result = parseInt(num1) - parseInt(num2);
				break;
			case '*':
				result = parseInt(num1) * parseInt(num2);
                break;
            case ':':
				result = parseInt(num1) / parseInt(num2);
				break;
			default:
				message.reply('Unknown error!');
                return;
				break;
		}
        if(!isNaN(result)){ // if resultado is not a number 
            message.reply(result); // prints the result
        }
        
    }
    if(message.content.toLowerCase() === "db"){
		con.connect(function(err) { // connect to database
		  if (err) throw err;
		  message.reply('Connected to gandabotdb');
		});
	}
  	if (message.content === '/ola') {
	    if (message.member.voiceChannel) { // se o utilizador estiver num channel
	      message.member.voiceChannel.join()
	        .then(connection => { // Connection is an instance of VoiceConnection
	          //message.reply('I have successfully connected to the channel!');
	          const dispatcher = connection.playFile('C:/Users/Jaime/Downloads/ola.mp3');
	        })
	        .catch(console.log);

	    } else {
	      message.reply('You need to join a voice channel first!');
	    }
  }
    if (message.content === '/ohahaha') {
	    if (message.member.voiceChannel) { // se o utilizador estiver num channel
	      message.member.voiceChannel.join()
	        .then(connection => { // Connection is an instance of VoiceConnection
	          //message.reply('I have successfully connected to the channel!');
	          const dispatcher = connection.playFile('C:/Users/Jaime/Downloads/ohahaha.mp3');
	        })
	        .catch(console.log);

	    } else {
	      message.reply('You need to join a voice channel first!');
	    }
  }
});

bot.login(token); 


