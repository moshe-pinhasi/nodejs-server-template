import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'

import Logger from './services/logger.service'
import config from './config'
import errorHandler from './middlewares/errorHandler.middleware'
import authRoutes from './api/auth/auth.routes'
import accountRoutes from './api/account/account.routes'

const app = express()

app.use(morgan(config.morganFormat))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (process.env.NODE_ENV !== 'production') {
    const corsOptions = {
        origin: 'http://127.0.0.1:8080',
        credentials: true
    };
    app.use(cors(corsOptions));
}

// routes
app.use('/auth', authRoutes)
app.use('/account', accountRoutes)

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static(path.resolve(__dirname, 'public')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
  });
}

// global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT);
Logger.info('Server listening on port: ' + PORT)