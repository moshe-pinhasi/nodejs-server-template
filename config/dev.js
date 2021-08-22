module.exports = {
  env : {
    name: "development",
    isDev: true,
    isProd: false,
  },
  port: process.env.PORT || 3000,
  logger: {
    level: 'debug',
  },
  corsOptions: {
    origin: 'http://127.0.0.1:8080',
    credentials: true
  },
  dbURL: "localhost:3306",
  morganFormat: "tiny",
  jwt: {
    secret: "som_secret_string",
     options: { 
        expiresIn: "4h",
        algorithm: 'HS256' // this is the default
    }
  }
}
