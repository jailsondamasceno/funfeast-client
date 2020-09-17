
import chaves from '../../env'
import firebase from 'firebase/app'
import 'firebase/auth'

const auth = firebase.initializeApp(chaves.firebaseConfig)
export { auth }
