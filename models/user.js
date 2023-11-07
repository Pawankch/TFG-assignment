const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: '13.127.212.137',
    user: 'user',
    password: 'Pawan@8527344098',
    database: 'testdb',
});

// Connect to the MySQL database
connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL: ' + err.stack);
      return;
    }
    console.log('Connected to MySQL as id ' + connection.threadId);
});

// Define the user schema
const userSchema = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )
`;

// Create the user table in the database
connection.query(userSchema, (err, results) => {
  if (err) {
    console.error('Error creating user table: ' + err.stack);
  } else {
    console.log('User table created');
  }
});

const connectionPromise = async () => {
  const mysql = require("mysql2/promise");

  const connection = await mysql.createConnection(
    {
      host: '13.127.212.137',
      user: 'user',
      password: 'Pawan@8527344098',
      database: 'testdb',
    }
  );

  const [rows,fields] = await connection.execute(`SELECT * FROM users LIMIT 1`);
  if(!rows){
    
    await connection.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `)

  console.log("Table created")

  }else{
    console.log('table already exists')
  }
  return connection
}



module.exports = connectionPromise;
