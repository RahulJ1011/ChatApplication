const express = require('express')
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const user = require('./models/user')
app.use(cors({
    origin: 'http://localhost:5173/',
    credentials:true
}))
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Chat');
app.listen(4000,()=> console.log('server is running'))