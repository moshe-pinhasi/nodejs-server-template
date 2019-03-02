export default {
  "dbURL": process.env.DB_UR,
  "morganFormat": "combined",
  "jwt": {
    "secret": "som_secret_string",
     "options": { 
        "expiresIn": "4h",
        "algorithm": 'HS256'
     }
  }
}
