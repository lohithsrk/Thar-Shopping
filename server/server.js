const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bobyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const app = express();

mongoose
	.connect(process.env.DATABASE, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: true
	})
	.then(() => console.log('DATABASE CONNECTED'))
	.catch((error) => console.log('ERROR IN DATABASE CONNECTION', error));

app.use(morgan('dev'));
app.use(bobyParser.json({ limit: '2mb' }));
app.use(cors());

fs.readdirSync('./routes').map((route) =>
	app.use('/api', require(`./routes/${route}`))
);

app.listen(process.env.PORT, () =>
	console.log(`Server is running on PORT ${process.env.PORT}...`)
);
