import "./App.css";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io.connect(
  "https://88ff79a3-5621-4e58-9409-9ffb48de3a1d-00-4avv9nl6doyf.pike.replit.dev:3000/",
);

export default function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", { message });
    setMessage("");
  };

  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat((prevChat) => [...prevChat, payload]);
    });

    // Clean up socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <main>
      <h1>Let's learn socket.io</h1>
      <div>
        {chat.map((payload, index) => (
          <p key={index}>Message: {payload.message}</p>
        ))}
      </div>

      <form onSubmit={sendChat}>
        <input
          type="text"
          placeholder="Type Message..."
          value={message}
          name="chat"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </main>
  );
}
