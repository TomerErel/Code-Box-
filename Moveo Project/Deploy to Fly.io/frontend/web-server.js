const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'build')));

// when we use react router (client side routing) -- always return index.html on not found
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.listen(3000, () => {
  console.log('Moveo FE is running');
});