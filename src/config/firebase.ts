import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyBJhSSeYzDha2CReJZUgycuIMHXQtMBYl8',
  authDomain: 'deadpool-56dfd.firebaseapp.com',
  projectId: 'deadpool-56dfd',
  storageBucket: 'deadpool-56dfd.appspot.com',
  messagingSenderId: '782773688573',
  appId: '1:782773688573:web:d3a88e88304d397f728694',
  measurementId: 'G-Q66QBFN4ZX',
};

const appFirebase = initializeApp(firebaseConfig);
export const auth = getAuth(appFirebase);
export const googleAuth = new GoogleAuthProvider();
