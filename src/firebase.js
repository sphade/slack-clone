import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAzCFkvs6yQCMDhrV-Kcp6DHlA4JTltdgU",
    authDomain: "slack-clone-4085e.firebaseapp.com",
    projectId: "slack-clone-4085e",
    storageBucket: "slack-clone-4085e.appspot.com",
    messagingSenderId: "646036602769",
    appId: "1:646036602769:web:08a99f7cce9eb40ed5a430"
};
  
const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()
export {provider, db, auth}