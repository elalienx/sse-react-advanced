// Node modules
import { useState } from "react";
import ResultAPI from "./types/ResultAPI";

export default function App() {
  // Local state
  const [result, setResult] = useState<ResultAPI[]>([]);
  const [status, setStatus] = useState("On Stand by 🧊");

  // Methods
  function onStart() {
    const links = ["www.abc.com", "www.cnn.com", "www.nbc.net"];
    const query = links.map((l) => `link=${encodeURIComponent(l)}`).join("&");
    const eventSource = new EventSource(`http://localhost:8000/event?${query}`);

    setStatus("Starting connection 📡");
    setResult([]);

    eventSource.onmessage = function (event) {
      console.log("Frontend new message", event);
      updateEvent(event);
    };

    eventSource.onerror = function () {
      endEvent(eventSource);
    };
  }

  function updateEvent(event: MessageEvent) {
    const newResult: ResultAPI = JSON.parse(event.data);
    console.log("Frontend data received", newResult);

    setResult((previousResults) => [...previousResults, newResult]);
  }

  function endEvent(eventSource: EventSource) {
    console.log(result);
    eventSource.close();
    setStatus("Finished connection 🏁");
  }

  // Components
  const Items = result.map((item, index) => (
    <li key={index}>
      <a href={item.link} target="_blank">
        {item.date}
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
