const Logger = require('./services/logger.service')
const app = require('./server');

const port = process.env.PORT || 3000;

app.listen(port, () => {
    Logger.info('Server is running on port: ' + port)
});
