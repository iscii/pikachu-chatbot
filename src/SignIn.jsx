import React, { useState } from 'react';
import { auth } from './firebase.js';  // Import the Firebase auth instance
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const SignIn = () => {
  const [user, setUser] = useState(null);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      {!user ? (
        <button onClick={handleGoogleSignIn}>Sign In with Google</button>
      ) : (
        <div>
          <h2>Welcome, {user.displayName}</h2>
          <img src={user.photoURL} alt="User" />
        </div>
      )}
    </div>
  );
};

export default SignIn;
