// Node modules
import { useState } from "react";
import ResultAPI from "./types/ResultAPI";

export default function App() {
  // Local state
  const [result, setResult] = useState<ResultAPI[]>([]);
  const [status, setStatus] = useState("On Stand by 🧊");

  // Methods
  function onStart() {
    const links = [
      "http://www.abc.com",
      "http://www.cnn.com",
      "http://www.nbc.com",
    ];
    const query = links.map((l) => `links=${encodeURIComponent(l)}`).join("&");
    const eventSource = new EventSource(`http://localhost:8000/event?${query}`);

    setStatus("Starting connection 📡");
    setResult([]);

    eventSource.onmessage = function (event) {
      updateEvent(event);
    };

    eventSource.onerror = function () {
      endEvent(eventSource);
    };
  }

  function updateEvent(event: MessageEvent) {
    const newResult: ResultAPI = JSON.parse(event.data);

    setResult((previousResults) => [...previousResults, newResult]);
  }

  function endEvent(eventSource: EventSource) {
    eventSource.close();
    setStatus("Finished connection 🏁");
  }

  // Components
  const Items = result.map((item, index) => (
    <li key={index}>
      <a href={item.link} target="_blank">
        {item.time}
      </a>
    </li>
  ));

  return (
    <div id="app">
      <h1>SSE React</h1>
      <p>{status}</p>
      <ol>{Items}</ol>
      <button onClick={() => onStart()}>Start Connection 🏁</button>
    </div>
  );
}
