import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import pikachu_pfp from "./assets/pikachu_pfp.jpg";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  getDocs,
  where,
} from "firebase/firestore";

const ChatBotUIComp = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const stillThereTimeout = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      if (user) {
        const messagesRef = collection(db, "messages");
        const q = query(
          messagesRef,
          where("userId", "==", user.uid),
          orderBy("timestamp", "asc")
        );
        const querySnapshot = await getDocs(q);
        const messagesData = querySnapshot.docs.map((doc) => doc.data());
        setMessages(messagesData);
      }
    };
    fetchMessages();
  }, [user]);

  useEffect(() => {
    const chatWindow = document.querySelector(".chat-window");
    if (chatWindow) {
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }
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

  const handleSend = async () => {
    if (input.trim()) {
      const newUserMessage = { sender: "user", text: input, timestamp: new Date(), userId: user.uid };
      await addDoc(collection(db, "messages"), newUserMessage);
      setMessages((prevMessages) => [...prevMessages, newUserMessage]);

      setInput("");

      setTimeout(async () => {
        const newAiMessage = { sender: "ai", text: generatePikachuVocabulary(), timestamp: new Date(), userId: user.uid };
        await addDoc(collection(db, "messages"), newAiMessage);
        setMessages((prevMessages) => [...prevMessages, newAiMessage]);
      }, Math.random() * 2000);

      if (stillThereTimeout.current) {
        clearTimeout(stillThereTimeout.current);
      }
      stillThereTimeout.current = setTimeout(() => {
        const newAiMessage = { sender: "ai", text: "Pika?", timestamp: new Date(), userId: user.uid };
        addDoc(collection(db, "messages"), newAiMessage);
        setMessages((prevMessages) => [...prevMessages, newAiMessage]);
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
    <div className={`message ${message.sender === "user" ? "user-message" : "ai-message"}`}>
      {message.sender === "ai" && (
        <img src={pikachu_pfp} alt="Pikachu Avatar" className="ai-avatar" />
      )}
      <span className="message-text">{message.text}</span>
    </div>
  );
};
