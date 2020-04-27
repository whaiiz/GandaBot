const Discord = require('discord.js') 
const bot = new Discord.Client(); 
const token = 'NjMzMzc4MDA2NjU5NzYwMTM4.XqRf0g.7juT3W5zgP64lmK0leIKvgl8_VI'; 

const connectDb = require('./dbconnect.js');

let con = dbConnect();


function isOperation(message){ 
    if(message.includes('+') || message.includes('-') || message.includes(':') || message.includes('*'))
        return true;
}

function isOperator(char){
    if(char === '+' || char === '*'  || char === '-'  || char === ':')
       return true;	
	return false;
}

bot.on('ready', () => { 
	console.log('Ganda BOT is online!');
});

bot.on('message', message => {

	if (!message.guild) return;

  	if(message.content.toLowerCase() === "hello" || message.content.toLowerCase() === "hello" ){
		message.reply('hello.');
	}
	if(message.content.toLowerCase() === "bye"){
		message.reply('bye.');
	}
    if(message.content.toLowerCase() === "talk"){
		message.channel.send('Talk is code, the me show bobs and vagene!');
	}
	
	if(message.content[0] === '/' && isOperation(message.content) === true){ 
        var numberAux=''; 
        var operators = [], numbers = [];
        
        for(var i = 1 ; i < message.content.length ; i++){
            if(isOperator(message.content[i]) === true){
                numbers.push(numberAux);
                numberAux = '';
                operators.push(message.content[i]);
                
            }else if(isOperator(message.content[i]) === false) {
                numberAux = numberAux + message.content[i];
            }
		}

		if(!isNaN(result))
        	message.reply(numbers);
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
	        .then(connection => {
	          const dispatcher = connection.playFile('C:/Users/Jaime/Downloads/ola.mp3');
	        })
	        .catch(console.log);

	    } else {
	      message.reply('You need to join a voice channel first!');
	    }
  }
});

bot.login(token); 

