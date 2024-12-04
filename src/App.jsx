import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ChatBotUIComp from './chatbot'

function App() {
  return (
    <div className="App">
      <h1 className="title">Pikachu Chatbot</h1>
      <ChatBotUIComp />
    </div>
  );
}

export default App
