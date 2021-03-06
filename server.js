const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan')
const connectDB = require('./config/db');
const colors = require('colors'); 
const errorHandler = require('./middleware/errorHandler');

// load env vars
dotenv.config({ path: './config/config.env' })

// db connection
connectDB()

// Route files
const bootcamps = require('./routes/bootcamp');

const app = express();

// app config
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Mount middleware
if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

// handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server and exit process
  server.close(() => process.exit(1));
})