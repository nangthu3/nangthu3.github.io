
var config = {
  apiKey: "AIzaSyCdexlg5hZV5yU5u1aQEbl4MJS3pKuXIkw",
  authDomain: "xetor-6ea5a.firebaseapp.com",
  databaseURL: "https://xetor-6ea5a.firebaseio.com",
  projectId: "xetor-6ea5a",
  storageBucket: "xetor-6ea5a.appspot.com",
  messagingSenderId: "573201768150"
};
firebase.initializeApp(config);

//   firebase.auth().onAuthStateChanged(function(user) {
//     if (user) {
//       // User is signed in.
//     } else {
//       // No user is signed in.
//     }
//   });

var user = firebase.auth().currentUser;
var name, email, photoUrl, uid, emailVerified;
var provider;

if (user) {
  // User is signed in.
} else {
  // No user is signed in.
}
if (user != null) {
  name = user.displayName;
  email = user.email;
  photoUrl = user.photoURL;
  emailVerified = user.emailVerified;
  uid = user.uid;  
// The user's ID, unique to the Firebase project. Do NOT use
// this value to authenticate with your backend server, if
// you have one. Use User.getToken() instead.

  user.providerData.forEach(function (profile) {
    console.log("Sign-in provider: " + profile.providerId);
    console.log("  Provider-specific UID: " + profile.uid);
    console.log("  Name: " + profile.displayName);
    console.log("  Email: " + profile.email);
    console.log("  Photo URL: " + profile.photoURL);
  });
}

function logInWithGoogle(){
  console.log("logInWithGoogle");
  provider = new firebase.auth.GoogleAuthProvider();
  // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  signInWithPopUp();
}

function logInWithFacebook(){
  console.log("logInWithFacebook");
  provider = new firebase.auth.FacebookAuthProvider();
  // provider.addScope('user_birthday');
  signInWithPopUp();
}

function signInWithRedirect(){
  firebase.auth().signInWithRedirect(provider);
  firebase.auth().getRedirectResult().then(function(result) {
      if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // ...
      }
      // The signed-in user info.
      user = result.user;
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
}

function signInWithPopUp(){
  firebase.auth().signInWithPopup(provider).then(function(result) {
      token = result.credential.accessToken;
      // The signed-in user info.
      user = result.user;
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      console.log(errorCode+"=="+errorMessage+"=="+email+"=="+credential);
    });
}

function signOut(){
  firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });      
}


$("#btn_login_google").click(function(){
  logInWithGoogle();
});

$("#btn_login_facebook").click(function(){
  logInWithFacebook();
});

