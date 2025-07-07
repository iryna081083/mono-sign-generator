const crypto = require('crypto');
const express = require('express');
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;
const signKey = '140ba6a9-1fb1-4093-8e04-84b268be597c';

app.post('/sign', (req, res) => {
  const payload = req.body.payload;

  if (!payload) {
    return res.status(400).json({ error: 'Missing payload' });
  }

  const hmac = crypto.createHmac('sha256', signKey);
  hmac.update(payload, 'utf8');
  const signature = hmac.digest('base64');

  res.json({ signature });
});

app.listen(PORT, () => {
  console.log(`Sign generator is running on port ${PORT}`);
});
