import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Next.js API',
    version: '1.0.0',
    description: 'Auto-generated Swagger doc from API routes',
  },
  servers: [
    {
      url: 'http://localhost:3000/api', // update to your prod domain later
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./pages/api/**/*.js'], // or js
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
