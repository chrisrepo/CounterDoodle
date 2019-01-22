const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const counterRouter = require('./server_router/counter.js');
app.use('/counter', counterRouter);

const authRouter = require('./server_router/auth.js');
app.use('/auth', authRouter);
