const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const careersRouter = require('./routes/careers');

const app = express();
const port = process.env.PORT || 4000;

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Actian Career Open Positions API',
            version: '1.0.0',
            description: 'API to retrieve open positions in a specified department at Actian',
        },
        servers: [
            {
                url: `http://localhost:${port}`,
                description: 'Development Server',
            },
        ],
    },
    apis: ['./routes/*.js']
};

const specs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/open-positions', careersRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});