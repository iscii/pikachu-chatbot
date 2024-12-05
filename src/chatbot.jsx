import React, { useState, useEffect } from 'react';
import './App.css';

const ChatBotUIComp = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

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
            {message.sender === 'ai' && (
              <img
                src="../public/pikachu_pfp.jpg"
                alt="Pikachu Avatar"
                className="ai-avatar"
              />
            )}
            <span className='message-text'>{message.sender === 'user' ? "You: " : "Pikachu: "}</span> {message.text}
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
