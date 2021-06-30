const Logger = require('./services/logger.service')
const app = require('./server');
const config = require('./config')
const port = config.port;

app.listen(port, () => {
    Logger.info('Server is running on port: ' + port)
});
