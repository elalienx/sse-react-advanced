// Node modules
import { useState } from "react";

export default function App() {
  // Local state
  const [messages, setMessages] = useState<string[]>([]);
  const [status, setStatus] = useState("On Stand by 🧊");

  const links = ["www.abc.com", "www.cnn.com", "www.nbc.net"];

  // Methods
  function onStart() {
    const query = links.map((l) => `link=${encodeURIComponent(l)}`).join("&");
    const eventSource = new EventSource(`http://localhost:8000?${query}`);

    setStatus("Starting connection 📡");
    setMessages([]);

    eventSource.onmessage = function (event) {
      updateMessage(event.data);
    };

    eventSource.onerror = function () {
      endMessage();
      eventSource.close();
    };
  }

  function updateMessage(newMessage: string) {
    setMessages((previousState) => [...previousState, newMessage]);
  }

  function endMessage() {
    setStatus("Finished connection 🏁");
  }

  // Components
  const Items = messages.map((item, index) => <li key={index}>{item}</li>);

  return (
    <div id="app">
      <h1>SSE React</h1>
      <p>{status}</p>
      <ol>{Items}</ol>
      <button onClick={() => onStart()}>Start Connection 🏁</button>
    </div>
  );
}
