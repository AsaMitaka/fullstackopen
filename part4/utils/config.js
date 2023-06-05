require('dotenv').config();

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const JWTSECRET = process.env.JWTSECRET;

module.exports = { PORT, MONGO_URL, JWTSECRET };
