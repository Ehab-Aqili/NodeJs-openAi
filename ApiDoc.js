/**
 * @swagger
 * tags:
 *   name: AI Tools
 *   description: Endpoints related to grammar correction
 */

/**
 * @swagger
 * /api/generate-completion:
 *   post:
 *     summary: Grammar Correction
 *     description: use openai to correction grammar
 *     tags:
 *       - Grammar
 *     requestBody:
 *       description: User details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userMessage:
 *                 type: string
 *     responses:
 *       200:
 *         description: Correction Text
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/image-extract:
 *   post:
 *     summary: Extract Text from Image
 *     description: Perform OCR on an image to extract text
 *     tags:
 *       - Grammar
 *     requestBody:
 *       description: Form data containing an image file
 *       required: true
 *       content:
 *         multipart/form-data:  # Specify the content type for file uploads
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary  # Indicate that the content is binary (file)
 *     responses:
 *       200:
 *         description: Text extracted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 extractedText:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

/**
//  * @swagger
//  * /api/speech-to-text:
//  *   get:
//  *     summary: Convert Speech to Text
//  *     description: Use OpenAI to transcribe audio to text
//  *     tags:
//  *       - Grammar
//  *     responses:
//  *       200:
//  *         description: Text transcription successful
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: string
//  *       500:
//  *         description: Internal Server Error
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 error:
//  *                   type: string
//  */

/**
 * @swagger
 * /api/speech-to-text:
 *   post:  # Change from 'get' to 'post'
 *     summary: Convert Speech to Text
 *     description: Use OpenAI to transcribe audio to text
 *     tags:
 *       - Grammar
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:  # Specify the content type for file uploads
 *           schema:
 *             type: object
 *             properties:
 *               audioFile:
 *                 type: string
 *                 format: binary  # Indicate that the content is binary (file)
 *     responses:
 *       200:
 *         description: Text transcription successful
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
