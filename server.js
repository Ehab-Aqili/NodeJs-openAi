const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");
const swaggerSpec = require("./swaggerConfgr");
const swaggerUi = require("swagger-ui-express");
const OpenAiRouter = require("./routes/OpenAiRoutes");
const path = require("path");
// const apiLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 10,
//   message: "Too many requests from this IP, please try again later.",
// });
dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors());
// app.use(apiLimiter);

app.use("/api", OpenAiRouter);

app.use(express.static(path.join(__dirname, "./File")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./File/index.html"));
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
