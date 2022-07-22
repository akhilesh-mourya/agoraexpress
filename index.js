const express = require("express");
const Agora = require("agora-access-token");
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';


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
const db = getFirestore(app);


const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send("Agora Auth Token Server"));

// const port = process.env.PORT || 3000;
// app.listen(port, () => console.log(`Agora Auth Token Server listening at Port ${port}`));

app.post("/rtctoken", (req, res) => {
    // Generate Token Here
    const appID = "a12e74a9c9814071b316f55d43bad822";
    const appCertificate = "88bb6308b3cc48e0bc614f43f7038470";
    const uid = Math.floor(Math.random() * 100000);
    const expirationTimeInSeconds = 3600;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
    const role = Agora.RtcRole.SUBSCRIBER;
    const channel = req.body.channel;
    const token = Agora.RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channel, uid, role, privilegeExpiredTs);
    res.send({ uid, token });
  });
