/**
 * @swagger
 * tags:
 *   name: Grammar
 *   description: Endpoints related to grammar correction
 */

/**
 * @swagger
 * /generate-completion:
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
