// pages/api/analytics.ts
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  userMetrics?: any;
  pageViewMetrics?: any;
  error?: string;
  details?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Return mock data for local development
    return res.status(200).json({
      userMetrics: {
        totalUsers: 1254,
        newUsers: 487,
        activeUsers: 723
      },
      pageViewMetrics: {
        screenPageViews: 3842,
        engagementRate: 0.68,
        averageSessionDuration: 145
      }
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      error: 'Failed to fetch analytics data',
      details: error instanceof Error ? error.message : String(error)
    });
  }
}