const config = require('./utils/config');
const express = require('express');
const app = express();
const blogRoutes = require('./controllers/blogRoutes');
const cors = require('cors');

const mongoose = require('mongoose');
const mongoUrl = config.MONGO_DB_URI;

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
.then(result => {
  console.log('connected to MongoDB');
})
.catch((error) => {
  console.error('error connecting to MongoDB:', error.message);
});

app.use(cors())
app.use(express.json())
app.use('/api/blogs',blogRoutes);

module.exports = app;