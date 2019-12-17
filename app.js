require('dotenv').config()
const express = require('express');
const app = express();
const PORT = process.env.SERVER_PORT || 80;
const cors = require('cors');

const router = require('./router');
const { errorHandler } = require('./middlewares');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', router);

app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`API running on port:${PORT}`);
})

module.exports = app;