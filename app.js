var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var myMiddleware = require('./middleware/cache');

var indexRouter = require('./routes/index');
var quotesRouter = require('./routes/quotes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(myMiddleware.checkResponseCache);
app.use(myMiddleware.addResponseToCache);

app.use('/', indexRouter);
app.use('/quotes', quotesRouter);

module.exports = app;
