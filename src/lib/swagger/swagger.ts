import swaggerJsdoc from 'swagger-jsdoc';
import { swaggerPaths } from './paths';
import { swaggerComponents } from './components';

const options = {
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
    components: swaggerComponents,
    paths: swaggerPaths,
  },
  apis: ['./src/app/api/**/*.ts'], // API files with Swagger comments
};

export const swaggerSpec = swaggerJsdoc(options);
