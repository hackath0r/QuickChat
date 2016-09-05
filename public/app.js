// Initialize Firebase
var config = {
  apiKey: "AIzaSyAzV43LyU_0aJXMw_xFBf0FkTFQHeou8rc",
  authDomain: "quickchat-f0c1e.firebaseapp.com",
  databaseURL: "https://quickchat-f0c1e.firebaseio.com",
  storageBucket: "quickchat-f0c1e.appspot.com",
};

firebase.initializeApp(config);

var app = angular.module('QuickChat', ['firebase']);
console.log(app);

app.controller("MyCtrl", function($scope, $firebaseObject) {
//var ref = new Firebase("https://quickchat-f0c1e.firebaseio.com/Available");

const preObject = document.getElementById('object');
const preObject2 = document.getElementById('object2');
const ulList =  document.getElementById('users');
const messageList = document.getElementById('message_list');
const messageForm = document.getElementById('message-form');
const userName = document.getElementById('username');
const userNameInputForm = document.getElementById('user-name-input');
const enterMessage = document.getElementById('enterMessage');
const messageInput = document.getElementById('message');
const sendButton = document.getElementById('submit');
const chatView = document.getElementById('chat-view');


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

console.log(chatsRef);

console.log(userNameListRef);

userNameListRef.on('value', snap   => {
  preObject2.innerText = JSON.stringify(snap.val(), null, 3);
});

userNameInputForm.addEventListener('submit', event => {
  event.preventDefault();
  from_user_ref = userNameListRef.push({
    name: userName.value
  });

  from_user_name = userName.value;
  //from_user_id = from_user_ref.name();

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
    //alert("you want to talk to " + li.innerText);
    /*
    chatsRef.push({
      "message-list": null
    });
  */
    const messageListRef = chatsRef.child('message-list');


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


/*
    messageListRef.on('child_changed', snapshot => {

      const liChanged = document.getElementById(snapshot.key);
      liChanged.innerText = snapshot.val();
    });


    messageListRef.on('child_removed', snapshot => {

      const liToRemove= document.getElementById(snapshot.key);
      liToRemove.remove();
    });
*/

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



/*
ref.on('value', snap   => {
  preObject.innerText = JSON.stringify(snap.val(), null, 3);
});
*/

/*
$scope.messages = [

  {name: prashant, message: "What's up?"},
  {name: ankit, message: "I'm good man"},
  {name: prashant, message: "Let's play today"}
]
*/

/*
ref.set({
title: "Hello World!",
author: "Firebase",
location: {
  city: "San Francisco",
  state: "California",
  zip: 94103
}*/


/*
ref.set({

  Available: [],
  Chats: {}

})
*/

/*
ref.child("Available").on("value", function(snapshot) {
  alert(snapshot.val());  // Alerts "San Francisco"
});

ref.child("Chats").on("value", function(snapshot) {
  alert(snapshot.val());
})
*/

// create a synchronized array
// click on `index.html` above to see it used in the DOM!
// console.log($firebaseArray(ref));
//$scope.messages = $firebaseArray(ref);

});
