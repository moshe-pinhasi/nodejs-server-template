module.exports = {
  "dbURL": process.env.DB_UR,
  "morganFormat": process.env.LOGGER_FORMAT,
  "jwt": {
    "secret": process.env.JWT_SECRET,
     "options": { 
        "expiresIn": process.env.JWT_EXPIRES,
        "algorithm": process.env.JWT_ALGORITHM
     }
  }
}
