// Importing required packages
const express = require('express');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: [
    'http://localhost:3001', // Your local frontend environment
    'https://auraalloywebapp.netlify.app' // Your production Netlify app
  ]
};
app.use(cors(corsOptions)); // Enable CORS for specific origins
app.set('port', process.env.PORT || 3000); // Application port is set

app.use(express.json()); // Parse incoming JSON request bodies

require('./app/routes')(app); // Routes are imported

app.listen(app.get('port'), () => {
  console.log(`Server is running on port ${app.get('port')}`);
});