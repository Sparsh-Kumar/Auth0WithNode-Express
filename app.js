
require ('dotenv').config ();
const express = require ('express');
const bodyParser = require ('body-parser');
const xss = require ('xss-clean');
const path = require ('path');
const helmet = require ('helmet');
const cors = require ('cors');
const port = process.env.PORT || 3000;
const { allowedOrigins } = require (path.resolve (__dirname, 'allowedOrigins', 'allowedOrigins'));
const { RouteHandler } = require (path.resolve (__dirname, 'RouteHandler', 'RouteHandler'));
const { auth } = require ('express-openid-connect');

const app = express ();
app.use (helmet ());

/*
app.use (cors ({
    origin: (origin, callback) => {
        if (!origin) {
            return callback (null, true);
        }
        if (allowedOrigins.indexOf (origin) === -1) {
            return callback (new Error ('This CORS policy for this site does not allow access from specified origin'), false);
        }
        return callback (null, true);
    }
}))
*/

app.use (cors ());

app.use (xss ());
app.use (bodyParser.json ({ limit: '10kb' }));

app.use (
    auth ({
        authRequired: false,
        auth0Logout: true,
        issuerBaseURL: process.env.ISSUER_BASE_URL,
        baseURL: process.env.BASE_URL,
        clientID: process.env.CLIENT_ID,
        secret: process.env.SECRET
    })
)

app.use ('/api', RouteHandler);

app.listen (port, () => {
    console.log (`http://localhost:${port}`);
})