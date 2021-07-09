
var admin = require("firebase-admin");

var serviceAccount = require("./friendlychat-ec593-firebase-adminsdk-vyqbo-c10a55cace.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://friendlychat-ec593-default-rtdb.firebaseio.com"
});
var db = admin.database();
var ref = db.ref("messages").limitToLast(1);
//sendMessage();
ref.on('child_added', (snapshot) => {
  const name = snapshot.val()['name'];
  const text = snapshot.val()['text'];
  sendMessage(name,text);
  console.log(snapshot.val());
}, (errorObject) => {
  console.log('The read failed: ' + errorObject.name);
});

function sendMessage(name,text){
  const coillapse_key = "1"
  const registrationToken = "epbW4zdxTYOlZJchNZdL9v:APA91bGb2nxlACckVESmyYmg5hCtgj8ij8otK1gFYKLIVcOCM1XEwRC4GcY8VpE0nn56XJRbaEXSE9d5rb8wIKgDKv2FVk_Le2UyERg0wVMRHplyWdK5g3IC6JeVgd_tWEGXLcIqVFft";
  const message = {
    'notification': {
      'title': name,
      'body': text
    },
    'android':{
      "collapse_key":"1"
    },
    token: registrationToken
    
  };
  admin.messaging().send(message)
  .then((response) => {
    // Response is a message ID string.
    console.log('Successfully sent message:', response);
  })
  .catch((error) => {
    console.log('Error sending message:', error);
  });

}
