// Importing required packages
const express = require('express');

const app = express();

app.set('port', process.env.PORT || 3000); // Application port is set

app.use(express.json()); // Parse incoming JSON request bodies

require('./app/routes')(app); // Routes are imported

app.listen(app.get('port'), () => {
  console.log(`Server is running on port ${app.get('port')}`);
});