const express = require("express");
const admin = require('firebase-admin');
const bodyParser = require('body-parser'); // body-parser를 import 합니다.
const fs = require('fs');


const pathToJsonFile = './path/to/serviceAccountKey.json';

fs.promises.readFile(pathToJsonFile, 'utf8')
  .then((data) => {
    const serviceAccount = JSON.parse(data);
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      })
  })
  .catch((error) => {
    console.error('Error reading JSON file:', error);
  });


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/',async (req,res)=>{
    try {
        const token = req.headers.authorization?.split('Bearer ')[1];
        if (!token) {
          return res.status(401).json({ error: 'Authorization header missing' });
        }
    
        // Firebase에서 토큰 검증
        const decodedToken = await admin.auth().verifyIdToken(token);
        const uid = decodedToken.uid;
    
        // UID를 사용하여 사용자 정보 가져오기
        const userInfo = await admin.auth().getUser(uid);
        resData = {
            "ok": true,
            "msg": "Successfully registered",
            "data" : {
                "uid": userInfo.uid,
                "email": userInfo.email,
                "nickname": userInfo.displayName,
                "photoUrl": userInfo.photoURL
            }
        }
        res.status(200).json(resData);
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
})

app.get('/', (req,res)=>{
    res.send("ok")
})

const PORT = process.env.PORT || 3001;

const handleListening = () =>
  console.log(`✅Server listenting on http://localhost:${PORT} 🚀 `);

app.listen(PORT, handleListening);
