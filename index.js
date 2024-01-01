const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const {errorHandler} = require('./middlewares/errorHandler');
const corsOptions = require('./config/corsOptions');
const verifyJWT = require('./middlewares/verifyJWT')
const connectDB = require('./config/dbConn')

const PORT = process.env.PORT || 3500;
const app = express();
const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

// Logger
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs', 'access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }));

// DB connection
connectDB();

// Cors Options
app.use(cors(corsOptions));


// Url encoded
app.use(express.urlencoded({
    extended: true,
}))

// Json
app.use(express.json());

// Static File
app.use('/', express.static(path.join(__dirname, 'public')))

// Cookie Parser
app.use(cookieParser());


// Route
app.use('/user', require('./routes/authRoute'));
app.use('/video', require('./routes/videoRoute'));
app.use('/image', require('./routes/imageRoute'));
app.use('/audio', require('./routes/audioRoute'));
app.use(verifyJWT);
app.use('/', require('./routes/root'));


app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts("html")) {
        res.sendFile("views/404.html", {root: __dirname});
    }else if (req.accepts("json")) {
        res.send({
            error: "404 Not Found"
        })
    } else {
        res.type('txt').send("404 Not Found");
    }

})

app.use(errorHandler);

io.on('connection', (socket) => {
    console.log('a user connected');
});

mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server listening on ${PORT}`);
    })
})