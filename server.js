const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bobyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const compression = require('compression');
const path = require('path');
const enforce = require('express-sslify');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const app = express();

mongoose
	.connect(process.env.DATABASE, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false
	})
	.then(() => console.log('DATABASE CONNECTED'))
	.catch((error) => console.log('ERROR IN DATABASE CONNECTION', error));

app.use(compression());
app.use(morgan('dev'));
app.use(bobyParser.json({ limit: '2mb' }));
app.use(cors());

app.use(enforce.HTTPS({ trustProtoHeader: true }));

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, 'client/build')));
	app.get('*', function (req, res) {
		res.sendFile(path.join(__dirname, 'client/build', 'index.html'));  
	}
}

fs.readdirSync('./server/routes').map((route) =>
	app.use('/api', require(`./server/routes/${route}`))
);

app.listen(process.env.PORT, () =>
	console.log(`Server is running on PORT ${process.env.PORT}...`)
);
