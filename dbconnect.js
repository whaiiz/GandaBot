var mysql = require('mysql'); 

function dbConnect(){
  
  const con = mysql.createConnection({ // object to connect database
      host: "localhost",
      user: "root",
      password: "",
      database: "gandabotdb"
  });

  return con;
}
