const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");
const fs = require("fs");
const rateLimit = require("express-rate-limit");
const Tesseract = require("tesseract.js");

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many requests from this IP, please try again later.",
});
dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors());
app.use(apiLimiter);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/generate-completion", async (req, res) => {
  const { userMessage } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You will be provided with statements, and your task is to convert them to standard English.",
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
      temperature: 0.7,
      max_tokens: 64,
      top_p: 1,
    });

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Speech To Text Endpoint

app.post("/speech-to-text", async (req, res) => {
  // const { userVoice } = req.body;

  try {
    const response = await openai.audio.transcriptions.create({
      file: fs.createReadStream("10-seconds-39474.mp3"),
      model: "whisper-1",
    });
    res.json(response.text);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/extract-text", (req, res) => {
  try {
    console.log("req.body", req.body);
    // Extract base64-encoded image data from the request body
    const base64Data = req.body.image;

    // Perform OCR on the image
    Tesseract.recognize(Buffer.from(base64Data, "base64"), "eng", {
      logger: (info) => console.log(info),
    })
      .then(({ data: { text } }) => {
        // Respond with the extracted text
        res.json({ extractedText: text });
      })
      .catch((error) => {
        console.error("Error processing image:", error);
        res.status(500).json({ error: "Internal Server Error" });
      });
  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/", (req, res) => {
  res.send("Welcome to my server!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
