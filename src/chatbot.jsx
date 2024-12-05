import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import pikachu_pfp from "./assets/pikachu_pfp.jpg";

const ChatBotUIComp = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const stillThereTimeout = useRef(null);

  useEffect(() => {
    setMessages([{ sender: "ai", text: "Pika!" }]); //initial message
  }, []);

  // scroll to bottom of chat window every update
  useEffect(() => {
    const chatWindow = document.querySelector(".chat-window");
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }, [messages]);

  function generatePikachuVocabulary() {
    const vocabularyList = [
      "Pika Pikachu",
      "Pi?",
      "Pi-ka",
      "Pi-ka-chu?",
      "Pikaaaa-chuuuuu",
      "Piiiika-chuuuuu",
      "Pikapikapika.... pi-ka",
      "Pipipipipi-chuchuchuchu",
      "Chuuuu-pika",
      "Pikapi",
      "Pikachu-pi",
      "Pika-chu",
      "Pikaka",
      "Pipipi",
      "PikakaPika",
      "PikaPika",
      "Pipi-kachu",
    ];

    const randomIndex = Math.floor(Math.random() * vocabularyList.length);
    return vocabularyList[randomIndex];
  }

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: "user", text: input }]);
      setInput("");
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "ai", text: generatePikachuVocabulary() },
        ]);
      }, Math.random() * 2000);

      // asks if ur still there after 20 seconds without response
      if (stillThereTimeout.current) {
        clearTimeout(stillThereTimeout.current);
      }
      stillThereTimeout.current = setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "ai", text: "Pika?" },
        ]);
      }, 20000);
    }
  };

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chat-window">
        {messages.map((message, index) => (
          <Message key={index} message={message} />
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
        <button onClick={handleSend} className="send-button">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBotUIComp;

const Message = ({ message }) => {
  return (
    <div
      className={`message ${
        message.sender === "user" ? "user-message" : "ai-message"
      }`}
    >
      {message.sender === "ai" && (
        <img src={pikachu_pfp} alt="Pikachu Avatar" className="ai-avatar" />
      )}
      <span className="message-text">{message.text}</span>
    </div>
  );
};
