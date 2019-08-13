import React from 'react';
import './App.css';

import * as firebase from 'firebase/app';
import 'firebase/auth';

import withFirebaseAuth, { WrappedComponentProps } from 'react-with-firebase-auth';

import firebaseConfig from './firebaseConfig';

const firebaseApp = firebase.initializeApp(firebaseConfig);

const App = ({
  /** These props are provided by withFirebaseAuth HOC */
  signInWithGoogle,
  signOut,
  setError,
  user,
  error,
}: WrappedComponentProps) => (
  <React.Fragment>
    {
      user
        ? <h1>Hello, {user.displayName}</h1>
        : <h1>Log in</h1>
    }

    {
      user
        ? <button onClick={signOut}>Sign out</button>
        : <button onClick={signInWithGoogle}>Sign in with Google</button>
    }
  </React.Fragment>
);

const firebaseAppAuth = firebaseApp.auth();

/** See the signature above to find out the available providers */
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

/** Wrap it */
export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
