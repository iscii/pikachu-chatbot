import React, { useState, useEffect } from "react";
import { auth, analytics } from "./firebase";
import { logEvent } from "firebase/analytics";
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import "./App.css";
import ChatBotUIComp from "./chatbot";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        logEvent(analytics, "sign_in", { method: "Google" });
        setIsAuthenticated(true);
        setUser(user);
      } else {
        logEvent(analytics, "sign_out");
        setIsAuthenticated(false);
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("User signed in with Google:", user);
      })
      .catch((error) => {
        console.error("Error during Google Sign-In:", error);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <div className="App">
      <div className="content-container">
        <h1 className="title">Pikachu Chatbot</h1>
        {isAuthenticated ? (
          <>
            <ChatBotUIComp user={user} />
            <button className="sign-out-button" onClick={handleSignOut}>
              Sign Out
            </button>
          </>
        ) : (
          <>
            <h2 className="sign-in">Please sign in to access the chatbot</h2>
            <button className="sign-in-button" onClick={signInWithGoogle}>
              Sign In with Google
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
