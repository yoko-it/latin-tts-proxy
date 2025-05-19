const express = require('express');
const fetch = require('node-fetch');
const app = express();
const cors = require('cors');

app.use(cors());

app.get('/tts', async (req, res) => {
  const q = req.query.q;
  if (!q) return res.status(400).send('No text provided');

  const googleUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=la&client=tw-ob&q=${encodeURIComponent(q)}`;
  const response = await fetch(googleUrl);
  const buffer = await response.buffer();

  res.set({
    'Content-Type': 'audio/mpeg',
    'Content-Disposition': 'attachment; filename="latin.mp3"',
  });

  res.send(buffer);
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server running');
});
