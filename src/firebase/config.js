import firebase from "firebase/app"
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBuwzTcHeSwpwkDNaC6-LCoLmxjed3XOJE",
    authDomain: "usermanagement-eb136.firebaseapp.com",
    projectId: "usermanagement-eb136",
    storageBucket: "usermanagement-eb136.appspot.com",
    messagingSenderId: "51008987125",
    appId: "1:51008987125:web:8850d24647b5fc09574abc"
  }

  firebase.initializeApp(firebaseConfig)
  
  const userFirestore = firebase.firestore()
  const userAuth = firebase.auth()
  const userStorage = firebase.storage()

  const timestamp = firebase.firestore.FieldValue.serverTimestamp

  export {userFirestore, userAuth, userStorage, timestamp}