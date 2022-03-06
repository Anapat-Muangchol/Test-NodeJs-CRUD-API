const SERVER_PORT = 3000;

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// homepage route
app.get('/', (req, res) => {
    return res.send({
        error: false, 
        message: 'Welcome to RESTful CRUD API with NodeJS, Express, MYSQL',
        written_by: 'Anapat',
        published_on: 'https://anapat-dev.dev'
    });
})

app.listen(SERVER_PORT, () => {
    console.log(`Node App is running on port ${SERVER_PORT}`);
});

// router
const routerBooks = require('./api/books.js')(app);
