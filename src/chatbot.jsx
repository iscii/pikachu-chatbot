import React, { useState, useEffect } from 'react';
import './App.css';

const ChatBotUIComp = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // Fetch the initial question from the backend on component load
  useEffect(() => {
    fetch("http://localhost:5000/ask")
      .then((response) => response.json())
      .then((data) => {
        setMessages([{ sender: 'ai', text: data.question }]);
      })
      .catch((error) => console.error('Error fetching initial question:', error));
  }, []);

  function generatePikachuVocabulary() {
    const vocabularyList = [
      'Pika Pikachu',
      'Pi?',
      'Pi-ka',
      'Pi-ka-chu?',
      'Pikaaaa-chuuuuu',
      'Piiiika-chuuuuu',
      'Pikapikapika.... pi-ka',
      'Pipipipipi-chuchuchuchu',
      'Chuuuu-pika',
      'Pikapi',
      'Pikachu-pi',
      'Pika-chu',
      'Pikaka',
      'Pipipi',
      'PikakaPika',
      'PikaPika',
      'Pipi-kachu'
    ];
  
    const randomIndex = Math.floor(Math.random() * vocabularyList.length);
    return vocabularyList[randomIndex];
  }
  
  

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: 'user', text: input }]);
      setInput('');

      // send the user response to backend
      fetch("http://localhost:5000/response", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ response: input }),
      })
        .then((response) => response.json())
        .then((data) => {
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'ai', text: data.next_question },
          ]);
        })
        .catch((error) => console.error('Error sending response:', error));

      // Simulate AI response (to be removed when backend is used)
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'ai', text: generatePikachuVocabulary() },
        ]);
      }, 1000);
    }
  };

  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chat-window">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === 'user' ? 'user-message' : 'ai-message'}`}
          >
            <strong>{message.sender === 'user' ? 'You:' : 'Pikachu:'}</strong> {message.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="chat-input"
          onKeyDown={handleEnter}
        />
        <button onClick={handleSend} className="send-button">Send</button>
      </div>
    </div>
  );
};

export default ChatBotUIComp;
