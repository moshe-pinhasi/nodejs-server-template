const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')
const config = require('./config')
require('express-async-errors')

const traceId = require('./middlewares/traceId.middleware')
const errorHandler = require('./middlewares/errorHandler.middleware')
const authRoutes = require('./api/auth/auth.routes')
const accountRoutes = require('./api/account/account.routes')

const app = express()

app.use(morgan(config.morganFormat))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (config.env.isDev) {
    const corsOptions = {
        origin: 'http://127.0.0.1:8080',
        credentials: true
    };
    app.use(cors(corsOptions));
}

app.use(traceId)

// routes
app.use('/api/auth', authRoutes)
app.use('/api/account', accountRoutes)

// if (!config.isDev) {
// Express will serve up production assets
// like our main.js file, or main.css file!
app.use(express.static(path.resolve(__dirname, 'public')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});
// }

// global error handler
app.use(errorHandler);

module.exports = app