var mysql = require('mysql');
const Discord = require('discord.js') 

mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "gandabotdb"
});