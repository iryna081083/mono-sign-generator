const crypto = require('crypto');
const express = require('express');
const app = express();

app.use(express.json());

const signKey = '140ba6a9-1fb1-4093-8e04-84b268be597c';

app.post('/generate-sign', (req, res) => {
  const body = JSON.stringify(req.body);
  const signature = crypto.createHmac('sha1', signKey).update(body).digest('hex');
  res.send({ sign: signature });
});

// Додаємо головну сторінку, щоб не було помилки Cannot GET /
app.get('/', (req, res) => {
  res.send('Sign generator is running!');
});

app.listen(3000, () => {
  console.log('Sign generator is running on port 3000');
});
