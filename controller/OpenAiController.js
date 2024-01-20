const OpenAI = require("openai");
const dotenv = require("dotenv");
const Tesseract = require("tesseract.js");
const fs = require("fs");

dotenv.config({ path: ".env" });
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error("OPENAI_API_KEY is missing in the environment variables.");
  process.exit(1); // Exit the process with an error code
}

const openai = new OpenAI({
  apiKey: apiKey,
});

const GrammarCorrection = async (req, res) => {
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
};

const ImageExtract = async (req, res) => {
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
};

const SpeechToText = async (req, res) => {
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
};

module.exports = {
  GrammarCorrection,
  ImageExtract,
  SpeechToText,
};
