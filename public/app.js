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
const ulList =  document.getElementById('users');

const ref = firebase.database().ref().child('object');

//this.object = $firebaseObject(ref);
//console.dir(firebase.database().rf);
const refList = ref.child('users');
const refChat = ref.child('chat');

ref.on('value', snap   => {
  preObject.innerText = JSON.stringify(snap.val(), null, 3);
});

/*
refChat.on('child_added' snap => {

});
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
