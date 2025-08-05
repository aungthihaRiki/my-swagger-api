import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  //apiFolder: 'src/api', // define api folder under src folder
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Next.js Prisma API',
      version: '1.1.1',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/app/api/**/*.ts'], // API files with Swagger comments
};

export const swaggerSpec = swaggerJsdoc(options);
