import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyCLCBuk88Y5DaBuTvPJErR4Mi1lXxt4VFo',
  authDomain: 'firechappvue.firebaseapp.com',
  databaseURL: 'https://firechappvue-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'firechappvue',
  storageBucket: 'firechappvue.appspot.com',
  messagingSenderId: '276786882149',
  appId: '1:276786882149:web:6105c6bcde414fcd24c88c'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const db = getDatabase(app)

export default db
