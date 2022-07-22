const express = require("express");
const Agora = require("agora-access-token");

const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send("Agora Auth Token Server"));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Agora Auth Token Server listening at Port ${port}`));

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
