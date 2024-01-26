import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("/");

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [recentMessages, setRecentMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessages([...messages]);
    socket.emit("message", message);
    setMessage("");
  };

  useEffect(() => {
    socket.on("message", receiveMessage);
    socket.on("recentMessages", (recentMessages) => {
      setRecentMessages(recentMessages);
    });

    return () => {
      socket.off("message", receiveMessage);
      socket.off("recentMessages");
    };
  }, []);

  const receiveMessage = (message) =>
    setMessages((state) => [...state, message]);

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <div className="bg-gray-900 p-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Chat Global</h1>
      </div>
      <ul className="flex-1 overflow-auto p-4">
        {recentMessages.map((message, i) => (
          <li
            key={i}
            className={`my-2 p-2 table text-sm rounded-md ${
              message.from === "Yo" ? "bg-blue-600 ml-auto" : "bg-gray-700 mr-auto"
            }`}
          >
            <span className="text-xs text-gray-400 block">
              {message.from}
            </span>
            <span className="text-sm break-all whitespace-pre-line">
              {message.body}
            </span>
          </li>
        ))}
        {messages.map((message, i) => (
          <li
            key={i + recentMessages.length}
            className={`my-2 p-2 table text-sm rounded-md ${
              message.from === "Yo" ? "bg-blue-600 ml-auto" : "bg-gray-700 mr-auto"
            }`}
          >
            <span className="text-xs text-gray-400 block">
              {message.from}
            </span>
            <span className="text-sm break-all whitespace-pre-line">
              {message.body}
            </span>
          </li>
        ))}
      </ul>
      <form className="bg-black p-4" onSubmit={handleSubmit}>
        <input
          className="border-2 border-gray-600 p-2 w-full text-black"
          type="text"
          placeholder="Escribe tu mensaje"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
    </div>
  );
}

export default Chat;
