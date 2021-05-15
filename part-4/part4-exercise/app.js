const config = require('./utils/config');
const express = require('express');
const app = express();
require('express-async-errors');
const blogRouter = require('./controllers/blogRoutes');
const userRouter = require('./controllers/userRoute');
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware');

const cors = require('cors');

const mongoose = require('mongoose');
const mongoUrl = config.MONGO_DB_URI;

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
.then(result => {
  if(process.env.NODE_ENV !== 'test')
    console.log('connected to MongoDB');
})
.catch((error) => {
  console.error('error connecting to MongoDB:', error.message);
});

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);


app.use('/api/users',userRouter);
app.use('/api/blogs',blogRouter);

app.use('/api/login', loginRouter);

module.exports = app;