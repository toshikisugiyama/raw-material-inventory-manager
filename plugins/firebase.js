import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyAmz2a3BtlzI7rMefXvFyhI4-2kv-Sq9UQ",
    authDomain: "vue-firebase-todo-app-e4fab.firebaseapp.com",
    databaseURL: "https://vue-firebase-todo-app-e4fab.firebaseio.com",
    projectId: "vue-firebase-todo-app-e4fab",
    storageBucket: "vue-firebase-todo-app-e4fab.appspot.com",
    messagingSenderId: "274899368546",
    appId: "1:274899368546:web:20d098ef9bb40ebc3b2f3b"
  })
}

export default firebase
