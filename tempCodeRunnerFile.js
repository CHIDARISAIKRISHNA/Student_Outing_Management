const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Saikrishna@123',
    database: 'security_checking'
});

connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL: ' + err.stack);
      return;
    }
    console.log('Connected to MySQL as id ' + connection.threadId);
  });
app.set('mysqlConnection', connection);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));
const agentRoute = require('./routes/security');
app.use('/se', agentRoute);
const PORT = 3000;
app.listen(PORT, function() {
    console.log(`Server is running on http://localhost:${PORT}`);``
});
