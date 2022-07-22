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

app.use(express.json());

// app.post("/rtctoken", (req, res) => {
//   // Generate Token Here
//   const appID = "a12e74a9c9814071b316f55d43bad822";
//   const appCertificate = "88bb6308b3cc48e0bc614f43f7038470";
//   const uid = Math.floor(Math.random() * 100000);
//   const expirationTimeInSeconds = 3600;
//   const currentTimestamp = Math.floor(Date.now() / 1000);
//   const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
//   const role = Agora.RtcRole.SUBSCRIBER;
//   const channel = req.body.channel;
//   const token = Agora.RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channel, uid, role, privilegeExpiredTs);
//   res.send({ uid, token });
// });
// app.get("/", (req, res) => res.send("Agora Auth Token Server"));


// app.set('port', (process.env.PORT || 3000))

//   app.listen(app.get('port'), function() {
//     console.log("Node app is running at localhost:" + app.get('port'))
//   })

  module.exports = app;