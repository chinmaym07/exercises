const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const PhoneBookRouter = require('./controllers/person');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const mongoose = require('mongoose');


logger.info('connecting to', config.MONGO_DB_URI);

mongoose.connect(config.MONGO_DB_URI , { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(result => {
        logger.info('connected to MongoDB');
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message);
    });

app.use(express.static('build'));
app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/persons', PhoneBookRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;