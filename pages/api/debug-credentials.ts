// pages/api/debug-credentials.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const credStr = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON || '{}';
    
    // Get first and last few characters to see the structure without exposing the full credentials
    const firstChars = credStr.substring(0, 30);
    const lastChars = credStr.substring(credStr.length - 30);
    
    // Check for common JSON format issues
    const startsWithBrace = credStr.trim().startsWith('{');
    const endsWithBrace = credStr.trim().endsWith('}');
    const hasNewlines = credStr.includes('\n');
    const hasCarriageReturns = credStr.includes('\r');
    
    return res.status(200).json({ 
      firstChars,
      lastChars,
      length: credStr.length,
      type: typeof credStr,
      startsWithBrace,
      endsWithBrace,
      hasNewlines,
      hasCarriageReturns
    });
  } catch (error) {
    return res.status(500).json({ error: 'Error checking credentials' });
  }
}