// Initialize Firebase
var config = {
  apiKey: "AIzaSyAzV43LyU_0aJXMw_xFBf0FkTFQHeou8rc",
  authDomain: "quickchat-f0c1e.firebaseapp.com",
  databaseURL: "https://quickchat-f0c1e.firebaseio.com",
  storageBucket: "quickchat-f0c1e.appspot.com",
};

firebase.initializeApp(config);
console.log(app);

var app = angular.module('QuickChat', ['firebase']);

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


const ref = firebase.database().ref().child('object');
//const messageListRef = firebase.database().ref().child('message_lsit');
//this.object = $firebaseObject(ref);
//console.dir(firebase.database().rf);
const messageListRef = ref.child('message-list');
const userNameListRef = ref.child('users');

console.log(userNameListRef);

messageListRef.on('value', snap   => {
  preObject.innerText = JSON.stringify(snap.val(), null, 3);
});

userNameListRef.on('value', snap   => {
  preObject2.innerText = JSON.stringify(snap.val(), null, 3);
});

userNameInputForm.addEventListener('submit', event => {
  event.preventDefault();
  userNameListRef.push({
    name: userName.value
  });
  userNameInputForm.style.display = 'none';
  enterMessage.innerText = "Welcome to QuickChat " + userName.value;
});

userNameListRef.on('child_added', snap => {
  var val = snap.val();
  const li = document.createElement('li');
  li.innerText = val.name;
  li.id = snap.key;
  ulList.appendChild(li);
});

userNameListRef.on('child_changed', snap => {

  const liChanged = document.getElementById(snap.key);
  liChanged.innerText = snap.val();
});


userNameListRef.on('child_removed', snap => {

  const liToRemove= document.getElementById(snap.key);
  liToRemove.remove();
});

messageForm.addEventListener('submit', event => {
  event.preventDefault();
  messageListRef.push({
    message: messageInput.value
  });
  messageForm.reset();
});

messageListRef.on('child_added', snap => {
  var val = snap.val();
  const li = document.createElement('li');
  li.innerText = val.message;
  li.id = snap.key;
  messageList.appendChild(li);
});

messageListRef.on('child_changed', snap => {

  const liChanged = document.getElementById(snap.key);
  liChanged.innerText = snap.val();
});


messageListRef.on('child_removed', snap => {

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
//Sync list changes
refList.on('child_added', snap => {

  const li = document.createElement('li');
  li.innerText = snap.val();
  li.id = snap.key;
  ulList.appendChild(li);
});


refList.on('child_changed', snap => {

  const liChanged = document.getElementById(snap.key);
  liChanged.innerText = snap.val();
});


refList.on('child_removed', snap => {

  const liToRemove= document.getElementById(snap.key);
  liToRemove.remove();
});
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
