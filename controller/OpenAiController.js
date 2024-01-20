
const OpenAI = require("openai");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });




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



module.exports = {
    
}