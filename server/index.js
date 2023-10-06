const path = require("path");
const express = require("express");
const axios = require("axios");
require("dotenv").config();

const PORT = process.env.PORT || 3001;
const apiKey = process.env.MY_OPENAI_KEY;

const app = express();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

// app.get("/api", (req, res) => {
//   res.json({ message: "Hello from server!" });
// });

app.get("/api", (req, res) => {
  const userQuestion = req.query.question;

  const options = {
    method: "POST",
    url: "https://api.openai.com/v1/chat/completions",
    headers: {
      // 'GPT-API-Key':process.env.REACT_APP_API_KEY,
      // 'GPT-API-Host': 'api.openai.com/v1/chat/completions.com'
      Authorization: `Bearer ${apiKey}`,
    },
    data: {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant. You answer Questions precisely and in a short way.",
        },
        { role: "user", content: userQuestion },
      ],
    },
  };

  axios
    .request(options)
    .then(function (response) {
      const assistantReply = response.data.choices[0].message.content;
      res.json({ reply: assistantReply });
    })
    .catch(function (error) {
      console.error("an error occured", error.response.data);
      res.status(500).json({ error: "An error occurred on the server." });
    });
});

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
