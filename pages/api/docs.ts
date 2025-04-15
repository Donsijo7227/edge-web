import type { NextApiRequest, NextApiResponse } from 'next'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from '@/lib/swagger'

const express = require('express')
const app = express()

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export const config = {
  api: {
    bodyParser: false,
  },
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  app(req as any, res as any)
}
