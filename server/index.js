const path = require("path");
const express = require("express");
const axios = require("axios");
require("dotenv").config();
const fs = require("fs");

const PORT = process.env.PORT || 3001;
const apiKey = process.env.MY_OPENAI_KEY;

const app = express();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("/api", (req, res) => {
  const userAnswer = req.query.userAnswer;
  const systemContent = req.query.content;
  const correctAnswer = req.query.correctAnswer;
  const question = req.query.question;

  const options = {
    method: "POST",
    url: "https://api.openai.com/v1/chat/completions",
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    data: {
      model: "gpt-3.5-turbo",
      messages: [
        // {
        //   role: "system",
        //   content:
        //     "You are a helpful assistant. You answer Questions precisely and in a short way.",
        // },
        {
          role: "system",
          content: systemContent,
        },
        // { role: "user", content: userQuestion },
        {
          role: "user",
          content: `<p> ${userAnswer}. </p> <p> ${correctAnswer} </p>`,
        },
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

const getRandomElementsFromArray = (num, arr) => {
  if (num <= 0) {
    return [];
  }

  if (num >= arr.length) {
    return arr.slice(); // Return a copy of the entire array
  }

  const result = [];
  const shuffled = arr.slice(); // Create a copy of the array to avoid modifying the original

  for (let i = 0; i < num; i++) {
    const randomIndex = Math.floor(Math.random() * shuffled.length);
    result.push(shuffled.splice(randomIndex, 1)[0]); // Remove and push a random element
  }

  return result;
};

app.get("/json", (req, res) => {
  const questionNumber = req.query.questionNumber;
  const learningField = req.query.learningField;
  // Read the JSON file
  fs.readFile("server/quizletWithIndexAndLF.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading data.json:", err);
      res.status(500).json({ error: "An error occurred on the server." });
    } else {
      try {
        // Parse the JSON data
        const jsonData = JSON.parse(data);

        const randomElements = getRandomElementsFromArray(
          Number(questionNumber),
          jsonData
        );

        // Send the questions as a response
        res.json(randomElements);
      } catch (parseError) {
        console.error("Error parsing JSON data:", parseError);
        res.status(500).json({ error: "An error occurred on the server." });
      }
    }
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
