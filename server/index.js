require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectionToDB = require('./DB/connection');

const app = express();
const port = process.env.PORT;

connectionToDB(process.env.MONGO_URI);

const userRoutes = require('./routes/users');

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/user', userRoutes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
