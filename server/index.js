import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post('/api/validate', (req, res) => {
  const { code } = req.body;
  const raw = code?.trim().replace(/^FLAG\{(.+)\}$/i, '$1') || '';
  const answer = raw.toLowerCase().replace(/[^a-z ]/g, '');

  const valid = [
    'little saint james',
    'little st james',
    'little saint james island',
    'little st james island',
  ];

  if (valid.includes(answer)) {
    return res.json({
      success: true,
      flag: 'FLAG{little_saint_james}',
      message: 'Accès autorisé. Localisation confirmée. Brèche résolue.',
    });
  }

  const decoys = [
    'Accès refusé. Contre-mesures d\'intrusion activées.',
    'Clé invalide. Firewall déclenché.',
    'Code incorrect. Traçage initié sur votre connexion.',
    'Authentification échouée. Alerte envoyée à l\'équipe SOC.',
    'Mauvaise localisation. Réanalysez les coordonnées.',
  ];

  return res.json({
    success: false,
    flag: null,
    message: decoys[Math.floor(Math.random() * decoys.length)],
  });
});

app.get('/api/status', (_req, res) => {
  res.json({
    threat_level: 'CRITIQUE',
    compromised_nodes: Math.floor(Math.random() * 20) + 30,
    active_connections: Math.floor(Math.random() * 500) + 100,
    firewall_status: 'CONTOURNÉ',
    uptime: `${Math.floor(Math.random() * 72)}h ${Math.floor(Math.random() * 60)}m`,
  });
});

app.listen(PORT, () => {
  console.log(`[CTF Server] En cours sur http://localhost:${PORT}`);
});
