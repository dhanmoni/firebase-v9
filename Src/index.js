// console.log("Welcome to firebase v9 from index.js")
import {initializeApp} from 'firebase/app'

import {
  getFirestore, collection, getDocs,
  addDoc, deleteDoc, doc, updateDoc,
  onSnapshot,
  query, where, orderBy, serverTimestamp,
  getDoc
} from 'firebase/firestore'


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


// ####### get firestore data using async await ######
// const getDataFromServer = async (colRef) => {
//   const snapshots = await getDocs(colRef)
//   let books= [];
//   snapshots.docs.forEach(doc=> {
//     books.push({...doc.data(), id: doc.id})
//   })
//   console.log(books)
// }

// getDataFromServer(colRef)

// ####### get firestore data using callbacks #######
// getDocs(colRef)
//   .then(snapshot=> {
//     let books= [];
//     snapshot.docs.forEach(doc=> {
//       books.push({...doc.data(), id: doc.id})
//     })
//     console.log(books)
//   })
//   .catch(err=>console.log(err))

// make a query and use it inside the onSnapshot funtion instead of colRef
// const q = query(colRef, where('author', '==', 'Dhanmoni Nath'))
const custom_query = query(colRef, orderBy('createdAt'))

// ####### real time data #######
onSnapshot(custom_query, (snapshot)=> {
  let books= [];
  snapshot.docs.forEach(doc=> {
    books.push({...doc.data(), id: doc.id})
  })
  console.log(books)
})


// adding documents
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', async e=> {
  e.preventDefault();
  await addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp()
  })
  addBookForm.reset()
})


// adding documents
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', async e=> {
  e.preventDefault();
  const docRef = doc(db, 'books', deleteBookForm.id.value)
  await deleteDoc(docRef)
  deleteBookForm.reset()
})

//update document
const updateBookForm = document.querySelector('.update')
updateBookForm.addEventListener('submit', async e=> {
  e.preventDefault()
  const docRef = doc(db, 'books', updateBookForm.id.value);
  await updateDoc(docRef, {
    title: updateBookForm.newTitle.value
  })
  updateBookForm.reset()
})

// get single document and subscibe to changes using onSnapshot
// const docRef = doc(db, 'books', 'nFxdvngZ7A3a9uYWF6jg')

// onSnapshot(docRef, (doc)=> {
//   console.log(doc.data())
// })