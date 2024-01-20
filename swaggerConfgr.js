const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0", // Specify the OpenAPI version
    info: {
      title: "Open AI With NodeJS",
      version: "1.0.0",
      description:
        "Use OpenAI to create Grammar Correction and image text extractor.",
    },
  },
  // Specify the paths to your API routes
  apis: ["./ApiDoc.js"],
};

swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
