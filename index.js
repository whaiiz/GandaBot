const Discord = require('discord.js') // discord.js é um modulo de node.js que permite interagir com a Discord API facilmente.
var mysql = require('mysql'); // modulo mysql

const bot = new Discord.Client(); // declarar o objeto bot

const token = 'NjMzMzc4MDA2NjU5NzYwMTM4.XaTn6Q.yLdCezChwPAvJrO_EBILnUrBlbI'; // token do bot

const con = mysql.createConnection({ // objeto
  host: "localhost",
  user: "root",
  password: "",
  database: "gandabotdb"
});


bot.on('ready', () => { // quando o bot ligar
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


	if(message.content[0] === '/' && (message.content.includes('+') || message.content.includes('*') || message.content.includes('-') || message.content.includes(':') ) ){
        var num1 = 0;
		var num2 = 0;
		var resultado = 0;
		var operacao;
		num1 = parseInt(message.content[1]); // init num1 to the second char of the message content
		for(var i = 2 ; message.content[i] != '+' && message.content[i] != '*' && message.content[i] != '-' && message.content[i] != ':'; i++){
            num1 = (num1 * 10) + parseInt(message.content[i]);
        }
		operacao = message.content[i];
		i++;
		num2 = parseInt(message.content[i]);	
		for(var i = message.content.indexOf(operacao) + 2 ; i < message.content.length; i++){
			num2 = (num2 * 10) + parseInt(message.content[i]);
		}
        switch(operacao){
			case '+':
				resultado = parseInt(num1) + parseInt(num2);
				break;
			case '-':
				resultado = parseInt(num1) - parseInt(num2);
				break;
			case '*':
				resultado = parseInt(num1) * parseInt(num2);
                break;
            case ':':
				resultado = parseInt(num1) / parseInt(num2);
				break;
			default:
				message.reply('Unknown error!');
                return;
				break;
		}
        if(!isNaN(resultado)){
            message.reply(resultado);
        }
        
    }
    if(message.content.toLowerCase() === "db"){
		con.connect(function(err) {
		  if (err) message.reply('OH PUTA VAIS PARAR COM ESSA MERDA') //throw err;
		  message.reply('Connected to gandabotdb');
		});
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


