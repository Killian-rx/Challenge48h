import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post('/api/validate', (req, res) => {
  const { code } = req.body;

  if (code === 'breach_completed') {
    return res.json({
      success: true,
      flag: 'FLAG{breach_completed}',
      message: 'Accès autorisé. Brèche confirmée.',
    });
  }

  const decoys = [
    'Accès refusé. Contre-mesures d\'intrusion activées.',
    'Clé invalide. Firewall déclenché.',
    'Code incorrect. Traçage initié sur votre connexion.',
    'Authentification échouée. Alerte envoyée à l\'équipe SOC.',
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
