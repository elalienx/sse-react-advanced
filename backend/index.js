// Node modules
import express from "express";

// Project files
import sleep from "./src/sleep.js";

// Properties
const app = express();
const port = 8000;

app.listen(port, () => console.log(`Backend V3 on port ${port}`));

app.get("/", async (request, response) => {
  console.log("📡 Connected");

  // Properties
  let maxMessages = 3;

  response.setHeader("Content-Type", "text/event-stream");
  response.setHeader("Cache-Control", "no-cache");
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Connection", "keep-alive");

  try {
    for (let index = 0; index < maxMessages; index++) {
      const date = new Date().toLocaleString();

      response.write(`data: ${date}\n\n`);
      await sleep(1000);
    }
  } catch (error) {
    console.error("🚨 Error:", error);
  } finally {
    console.log("🏁 Completed transfer");
    response.end();
  }
});
