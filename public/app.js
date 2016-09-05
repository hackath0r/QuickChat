// Initialize Firebase
var config = {
  apiKey: "AIzaSyAzV43LyU_0aJXMw_xFBf0FkTFQHeou8rc",
  authDomain: "quickchat-f0c1e.firebaseapp.com",
  databaseURL: "https://quickchat-f0c1e.firebaseio.com",
  storageBucket: "quickchat-f0c1e.appspot.com",
};

firebase.initializeApp(config);

var app = angular.module('QuickChat', ['firebase']);

app.controller("MyCtrl", function($scope, $firebaseObject) {

const preObject = document.getElementById('object');
const preObject2 = document.getElementById('object2');
const userNameInputForm = document.getElementById('user-name-input');
const ulList =  document.getElementById('users');
const userName = document.getElementById('username');
const messageList = document.getElementById('message_list');
const messageForm = document.getElementById('message-form');
const enterMessage = document.getElementById('enterMessage');
const messageInput = document.getElementById('message');
const sendButton = document.getElementById('submit');
const chatView = document.getElementById('chat-view');
const chatBuddy = document.getElementById('chat-buddy');


const ref = firebase.database().ref().child('object');
//const messageListRef = firebase.database().ref().child('message_lsit');
//this.object = $firebaseObject(ref);
//console.dir(firebase.database().rf);
//const messageListRef = ref.child('message-list');
const userNameListRef = ref.child('users');
const chatsRef = ref.child('chats');

var from_user_ref;
var from_user_id;
var from_user_name;

userNameListRef.on('value', snap   => {
  preObject2.innerText = JSON.stringify(snap.val(), null, 3);
});

userNameInputForm.addEventListener('submit', event => {
  event.preventDefault();
  from_user_ref = userNameListRef.push({
    name: userName.value
  });

  from_user_name = userName.value;
  from_user_id = from_user_ref.key;

  userNameInputForm.style.display = 'none';
  enterMessage.innerText = "Welcome to QuickChat " + userName.value + "!";
});

userNameListRef.on('child_added', snap => {
  var val = snap.val();
  const li = document.createElement('li');
  li.innerText = val.name;
  li.id = snap.key;
  ulList.appendChild(li);
  li.ondblclick = function() {

    var to_user_id = li.id;

    var messageUID = uniqueID(from_user_id, to_user_id);
    if(messageUID == 0) {
      alert("You can talk to yoursef without QuickChat!!");
      return;
    }

    chatBuddy.innerText = from_user_name + " your chat buddy is " + val.name

    const messageUIDRef = chatsRef.child(messageUID);

    const messageListRef = messageUIDRef.child('message-list');

    // Reset chat view
    messageList.innerHTML = "";
    chatView.style.display = 'block';

    messageListRef.on('value', snap   => {
      preObject.innerText = JSON.stringify(snap.val(), null, 3);
    });

    messageForm.addEventListener('submit', event => {
      event.preventDefault();
      if(messageInput.value != null || messageInput.value != "") {
        messageListRef.push({
          name: from_user_name,
          message: messageInput.value
        });
      }
      messageForm.reset();
    });

    messageListRef.on('child_added', snapshot => {
      var val = snapshot.val();
      if(val.message != null || val.message != ""){

        const li = document.createElement('li');
        li.innerText = val.name + ": " + val.message;
        li.id = snapshot.key;
        messageList.appendChild(li);
      }
    });

    messageListRef.on('child_changed', snapshot => {

      const liChanged = document.getElementById(snapshot.key);
      liChanged.innerText = snapshot.val();
    });

    messageListRef.on('child_removed', snapshot => {

      const liToRemove= document.getElementById(snapshot.key);
      liToRemove.remove();
    });


  };
});

userNameListRef.on('child_changed', snap => {

  const liChanged = document.getElementById(snap.key);
  liChanged.innerText = snap.val();
});

userNameListRef.on('child_removed', snap => {

  const liToRemove= document.getElementById(snap.key);
  liToRemove.remove();
});

// create a synchronized array
// click on `index.html` above to see it used in the DOM!
// console.log($firebaseArray(ref));
//$scope.messages = $firebaseArray(ref);
});

// Generates Unique identifier using two unique strings
function uniqueID(A, B) {
  if(A.localeCompare(B) == 0){
    return 0;
  }
  return A.localeCompare(B) < 0 ? A+B : B+A;
}
