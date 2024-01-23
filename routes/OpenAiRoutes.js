const express = require("express");
const {
  GrammarCorrection,
  ImageExtract,
  SpeechToText,
} = require("../controller/OpenAiController");

const OpenAiRouter = express.Router();
OpenAiRouter.post("/generate-completion", GrammarCorrection);
OpenAiRouter.post("/image-extract", ImageExtract);
OpenAiRouter.post("/speech-to-text", SpeechToText);

module.exports = OpenAiRouter;
