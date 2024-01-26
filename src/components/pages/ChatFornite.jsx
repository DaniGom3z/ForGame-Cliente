import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("/"); // Reemplaza con la URL de tu servidor Socket.IO

function ChatFornite() {
  const [messages, setMessages] = useState([]);
  const [recentMessages, setRecentMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Unirse a la sala al montar el componente
    socket.emit("joinRoom", "Chat Fornite");

    // Manejar mensajes recientes
    socket.on("recentMessages", (recentMsgs) => {
      setRecentMessages(recentMsgs);
    });

    // Manejar nuevos mensajes
    socket.on("message", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Limpiar la suscripción al desmontar el componente
    return () => {
      socket.emit("leaveRoom", "Chat Fornite");
      socket.off("recentMessages");
      socket.off("message");
    };
  }, []); // El segundo parámetro [] asegura que este efecto se ejecute solo una vez al montar el componente

  const handleSubmit = (e) => {
    e.preventDefault();

    if (message.trim() !== "") {
      // Enviar el nuevo mensaje al servidor
      socket.emit("message", { room: "Chat Fornite", body: message });
      setMessage("");
    }
  };
  const handleSalir = () => {
    socket.emit("leaveRoom", "Chat Fornite");
  };

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <div className="bg-gray-900 p-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Chat Fornite</h1>
        <a href="./">
          <button
            onClick={handleSalir}
            className="text-sm text-gray-300 px-2 py-1 bg-gray-600 rounded"
          >
            Salir
          </button>
        </a>
      </div>
      <ul className="flex-1 overflow-auto p-4">
        {[...recentMessages, ...messages].map((message, i) => (
          <li
            key={i}
            className={`my-2 p-2 table text-sm rounded-md ${
              message.from === "Yo"
                ? "bg-blue-600 ml-auto"
                : "bg-gray-700 mr-auto"
            }`}
          >
            <span className="text-xs text-gray-400 block">{message.from}</span>
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

export default ChatFornite;
