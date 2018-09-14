const path = require('path');

const express = require('express');

const PublicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(PublicPath))

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});
