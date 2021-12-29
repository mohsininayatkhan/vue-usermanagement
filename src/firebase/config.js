import firebase from "firebase/app"
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBuwzTcHeSwpwkDNaC6-LCoLmxjed3XOJEA",
    authDomain: "usermanagement-eb136a.firebaseapp.com",
    projectId: "usermanagement-eb136a",
    storageBucket: "usermanagement-eb136a.appspot.com",
    messagingSenderId: "510089871251",
    appId: "1:51008987125:web:8850d24647b5fc09574abca"
  }

  firebase.initializeApp(firebaseConfig)
  
  const userFirestore = firebase.firestore()
  const userAuth = firebase.auth()
  const userStorage = firebase.storage()

  const timestamp = firebase.firestore.FieldValue.serverTimestamp

  export {userFirestore, userAuth, userStorage, timestamp}
