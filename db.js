// Initialize Firebase
  var config = {
    apiKey: "AIzaSyB3FDjwLrfTfSBWRo4-z_S5o9D1rFh8ulU",
    authDomain: "synco-c1c21.firebaseapp.com",
    databaseURL: "https://synco-c1c21.firebaseio.com",
    projectId: "synco-c1c21",
    storageBucket: "synco-c1c21.appspot.com",
    messagingSenderId: "333441973483"
  };
  firebase.initializeApp(config);

var user = firebase.auth().currentUser;

function signup() {
  var newUsername = document.getElementById("new-account-uname").value;
  var newPassword = document.getElementById("new-account-pword").value;
  firebase.database().ref().child("profiles").push({
    username: newUsername
  });
  firebase.auth().createUserWithEmailAndPassword(newUsername + "@fakeemail.com", newPassword).then(function() {
    window.location.href = "index.html";
  }).catch(function(error) {
    alert(error)
  });
  user = firebase.auth().currentUser;
}

function signin() {
  var uname = document.getElementById("signin-uname").value;
  var password = document.getElementById("signin-password").value;
  firebase.auth().signInWithEmailAndPassword(uname + "@fakeemail.com", password).then(function() {
    user = firebase.auth().currentUser;
    window.location.href = "index.html";
  }).catch(function(error) {
    alert(error);
  });
}

function signout() {
  firebase.auth().signOut().then(function() {
    console.log("signed out");
  }).catch(function(error) {
    console.log(error);
  });
}

firebase.auth().onAuthStateChanged(function(user) {
  if(user) {
    document.getElementById("navbar-username").innerHTML = "<a href='?profile'>" + user.email.replace("@fakeemail.com", "") + "</a> <button class='btn-primary' style='background-color: red; color: white; font-size: 100%;'><a href='?edit' style='color: white;'>Make a New Story</a></button> <button class='btn-primary' style='background-color: red; margin: 0; font-size: 100%;' onclick='signout()'><a> Logout</a> </button>";
  } else {
    document.getElementById("navbar-username").innerHTML = "<button class='btn-primary' style='background-color: red; margin: 0; font-size: 100%;'><a href=\"index.html?login\">Login</a></button> or <button class='btn-primary' style='background-color: red; margin: 0; font-size: 100%;'><a href=\"index.html?signup\">Signup</a></button>";
  }
});


setInterval(function() {
  if(firebase.auth().currentUser) {
    localStorage.name = firebase.auth().currentUser.email.replace("@fakeemail.com","");
    localStorage.auth = btoa(firebase.auth().currentUser.email.replace("@fakeemail.com",""));
    if(atob(localStorage.auth) !== localStorage.name) {
      window.location.href = "about:blank";
    }
  } else {
    localStorage.name = null;
    localStorage.auth = null;
  }
}, 0);
