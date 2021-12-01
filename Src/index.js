// console.log("Welcome to firebase v9 from index.js")
import {initializeApp} from 'firebase/app'

import {getFirestore, collection, getDocs} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyC8CEIALd7kjuUaUEhVOLI5oBxHTUGzBfw",
  authDomain: "ninja-cloud-functions-f1052.firebaseapp.com",
  projectId: "ninja-cloud-functions-f1052",
  storageBucket: "ninja-cloud-functions-f1052.appspot.com",
  messagingSenderId: "307744957213",
  appId: "1:307744957213:web:92a31a7d3fd526e57eb7f4"
};

//initialize app
initializeApp(firebaseConfig)

//init service
const db = getFirestore()

//collection ref
const colRef = collection(db, 'books')

//get firestore data
getDocs(colRef)
  .then(snapshot=> {
    let books = [];
    snapshot.docs.forEach(doc=> {
      books.push({...doc.data(), id: doc.id})
    })
    console.log(books)
  })
  .catch(err=>console.log(err))