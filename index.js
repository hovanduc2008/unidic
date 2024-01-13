const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const http = require('http');

const {errorHandler} = require('./middlewares/errorHandler');
const corsOptions = require('./config/corsOptions');
const verifyJWT = require('./middlewares/verifyJWT')
const connectDB = require('./config/dbConn')
const { initializeSocket } = require('./config/services/socket');

const PORT = process.env.PORT || 3500;
const app = express();
const server = http.Server(app);

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


//initializeSocket
initializeSocket(server);
// Route
app.use('/user', require('./routes/authRoute'));
app.use('/articlecategory', require('./routes/articleCategoryRoute'));
app.use('/video', require('./routes/videoRoute'));
app.use('/image', require('./routes/imageRoute'));
app.use('/audio', require('./routes/audioRoute'));
app.use('/article', require('./routes/articleRoute'));
app.use('/chat', require('./routes/chatRoute'));
app.use('/comment', require('./routes/commentRoute'));
app.use('/component', require('./routes/componentRoute'));
app.use('/event', require('./routes/eventRoute'));
app.use('/groupmemmber', require('./routes/groupMemmberRoute'));
app.use('/group', require('./routes/groupRoute'));
app.use('/location', require('./routes/locationRoute'));
app.use('/mailtemplate', require('./routes/mailTemplateRoute'));
app.use('/productcategory', require('./routes/productCategoryRoute'));
app.use('/product', require('./routes/productRoute'));
app.use('/review', require('./routes/reviewRoute'));
app.use('/schedule', require('./routes/scheduleRoute'));
app.use('/tableofcontent', require('./routes/tableOfContentRoute'));




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

mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
    server.listen(PORT, () => {
        console.log(`Server listening on ${PORT}`);
    })
})