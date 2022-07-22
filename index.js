const express = require("express");
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore/lite');
var usersRouter = require('./talamus/app');
var createError = require('http-errors');
var path = require('path');
var bodyParser = require('body-parser');


const firebaseConfig = {
  apiKey: "AIzaSyBfb_9dnBRz-WiKVU2m2O5bZR5tW-b1MwU",
  authDomain: "talamus-818e3.firebaseapp.com",
  projectId: "talamus-818e3",
  storageBucket: "talamus-818e3.appspot.com",
  messagingSenderId: "768691742758",
  appId: "1:768691742758:web:19f2ee58ad9497d8235ee7",
  measurementId: "G-T3YM1JCJB5"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);


const app = express();
app.set('port', (process.env.PORT || 3000))
app.use(express.static(path.join(__dirname, 'talamus')));
app.use(bodyParser.json());
app.use('/app', usersRouter);


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
  res.json({
    message: err.message,
    error: err
  });
});

// app.use(express.json());

  app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'))
    res.send('respond with a resource');
  })

  module.exports = app;