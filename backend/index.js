// Node modules
import express from "express";

// Project files
import sleep from "./src/sleep.js";

// Properties
const app = express();
const port = 8000;

app.listen(port, () => console.log(`Backend V3 on port ${port}`));

app.get("/event", async (request, response) => {
  console.log("📡 Server Connected v2");

  // Properties
  const links = request.query.link;
  console.log("Server recived links", links);

  response.setHeader("Content-Type", "text/event-stream");
  response.setHeader("Cache-Control", "no-cache");
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Connection", "keep-alive");

  try {
    for (const link of links) {
      const date = new Date().toLocaleString();
      const data = "hi";
      console.log(data);

      response.write(`hi\n\n`);
      await sleep(1000);
    }
  } catch (error) {
    console.error("🚨 Error:", error);
  } finally {
    console.log("🏁 Completed transfer");
    response.end();
  }
});
