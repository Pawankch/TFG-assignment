var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs = require("fs");
const amqp = require("amqplib")

//Connecting rabbitmq
const mqUrl = `amqp://user:Pawan@4321@13.127.212.137:5672/node_project`

publishRabbitMQ = async (data,queueName) => {
  const connection = await amqp.connect(mqUrl);
  const channel = await connection.createChannel();
  channel.sendToQueue(queueName,Buffer.from(data));
}

subscribeRabbitMq = async (queueName) => {
  const connection = await amqp.connect(mqUrl);
  const channel = await connection.createChannel();

    // Ensure the queue exists
    await channel.assertQueue(queueName, { durable: false });

    channel.consume(queueName, (msg)=>{
      if(msg){
        const event = msg.content.toString();
        const logFile = './asset/userRegister.log'
        fs.appendFile(logFile,event,(err)=>{
          if(err){
            console.log("Error in MQ",err)
          }
        })
      }
      channel.ack(msg);
    })
}

const Auth = require("./services/auth");
const {rateLimitMiddleware} = require("./middleware/rateLimiter")

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var gameRouter = require("./routes/gameData")

var app = express();

const mongoose = require("mongoose")
if (mongoose.connection.readyState === 0) {
  mongoose.connect(require('../connections/mongo'));
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');




app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users',usersRouter);
app.use('/game',[Auth.checkAuthToken],gameRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(4000, async (err) => {
  if (err) throw err;
  await subscribeRabbitMq('userRegister')
  console.log('> Ready on http://localhost:4000')
})

module.exports = app;
