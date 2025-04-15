import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * @swagger
 * /hello:
 *   get:
 *     summary: Say hello
 *     responses:
 *       200:
 *         description: A friendly greeting
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ message: 'Hello from Swagger!' })
}
