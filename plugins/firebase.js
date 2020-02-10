import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyA-8NRWz7i_XrKXR4xfEy-K5-I5KJo8cqo',
    authDomain: 'rm-inventory-manager.firebaseapp.com',
    databaseURL: 'https://rm-inventory-manager.firebaseio.com',
    projectId: 'rm-inventory-manager',
    storageBucket: 'rm-inventory-manager.appspot.com',
    messagingSenderId: '415693554613',
    appId: '1:415693554613:web:44befd1b2dfb7c240d8ffc',
    measurementId: 'G-7514JQ6Y07'
  })
}

export default firebase
