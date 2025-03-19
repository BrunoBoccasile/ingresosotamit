import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API SOTAMIT',
            version: '1.0.0',
            description: 'API de alta baja y modificacion de empleados',
            contact: {
                name: 'Bruno Boccasile'
            },
            servers: [
                {
                    url: 'http://localhost:3000',
                    description: 'Local server'
                }
            ]
        }
    },
    apis: ['src/routes/*.js']
};

const specs = swaggerJsdoc(options);
export default specs;