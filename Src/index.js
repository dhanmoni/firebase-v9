// console.log("Welcome to firebase v9 from index.js")
import {initializeApp} from 'firebase/app'

import {
  getFirestore, collection, getDocs,
  addDoc, deleteDoc, doc, updateDoc,
  onSnapshot,
  query, where, orderBy, serverTimestamp,
  getDoc
} from 'firebase/firestore'

import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MSG_SENDER_ID,
  appId: process.env.APP_ID
};

//initialize app
initializeApp(firebaseConfig)

//init service
const db = getFirestore()
const auth = getAuth()

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


// ##### Firebase Auth ######

const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', async (e)=> {
  e.preventDefault();

  const email = signupForm.email.value
  const password = signupForm.password.value

  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password)
    // console.log(cred.user)
    signupForm.reset()
  } catch (error) {
    console.log(error)
  }
})


const logoutBtn = document.querySelector('.logout')
logoutBtn.addEventListener('click', async(e)=> {
  try {
    await signOut(auth)
    console.log('user signed out')
  } catch (error) {
    console.log(error)
  }
})

onAuthStateChanged(auth, (user)=> {
  console.log('User status changed', user)
  if(!user){
    logoutBtn.style.display = 'none';
  } else {
    logoutBtn.style.display = 'block';
  }
})

const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', async (e)=> {
  e.preventDefault();

  const email = loginForm.email.value
  const password = loginForm.password.value

  try {
    const cred = await signInWithEmailAndPassword(auth, email, password)
    // console.log(cred.user)
    loginForm.reset()
  } catch (error) {
    console.log(error)
  }
})