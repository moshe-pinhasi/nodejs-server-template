export default {
  "dbURL": "localhost:3306",
  "morganFormat": "tiny",
  "jwt": {
    "secret": "som_secret_string",
     "options": { 
        "expiresIn": "4h",
        "algorithm": 'HS256' // this is the default
    }
  }
}
