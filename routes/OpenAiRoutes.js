const express = require("express");
const {
  GrammarCorrection,
  ImageExtract,
  SpeechToText,
} = require("../controller/OpenAiController");
const multer = require("multer");
const upload = multer();

const OpenAiRouter = express.Router();
OpenAiRouter.post("/generate-completion", GrammarCorrection);
OpenAiRouter.post("/image-extract", upload.single("image"), ImageExtract);
OpenAiRouter.post("/speech-to-text", SpeechToText);

module.exports = OpenAiRouter;
