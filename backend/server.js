import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 8080;
const apiKey = process.env.GEMINI_API_KEY;

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/healthz', (_req, res) => {
  res.status(200).json({ ok: true });
});

app.post('/api/generate', async (req, res) => {
  if (!apiKey) {
    res.status(500).json({ error: 'Missing GEMINI_API_KEY on the server.' });
    return;
  }

  const { prompt, model = 'gemini-2.5-flash' } = req.body ?? {};
  if (!prompt || typeof prompt !== 'string') {
    res.status(400).json({ error: 'Missing prompt string.' });
    return;
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      res.status(response.status).json({ error: errorText });
      return;
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Unexpected server error.' });
  }
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
