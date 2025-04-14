// pages/api/test-credentials.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const credStr = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON || '{}';
  // Just return the first 20 characters to avoid exposing credentials
  return res.status(200).json({ 
    start: credStr.substring(0, 20),
    length: credStr.length,
    isString: typeof credStr === 'string'
  });
}