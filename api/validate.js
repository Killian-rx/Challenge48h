const VALID_ANSWERS = [
  'little saint james',
  'little st james',
  'little saint james island',
  'little st james island',
];

const DECOYS = [
  "Accès refusé. Contre-mesures d'intrusion activées.",
  'Clé invalide. Firewall déclenché.',
  'Code incorrect. Traçage initié sur votre connexion.',
  "Authentification échouée. Alerte envoyée à l'équipe SOC.",
  'Mauvaise localisation. Réanalysez les coordonnées.',
];

module.exports = (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Méthode non autorisée.' });
  }

  const code = req.body?.code;
  const raw = (code || '').trim().replace(/^FLAG\{(.+)\}$/i, '$1');
  const answer = raw.toLowerCase().replace(/[^a-z ]/g, '');

  if (VALID_ANSWERS.includes(answer)) {
    return res.status(200).json({
      success: true,
      flag: 'FLAG{little_saint_james}',
      message: 'Accès autorisé. Localisation confirmée. Brèche résolue.',
    });
  }

  return res.status(200).json({
    success: false,
    flag: null,
    message: DECOYS[Math.floor(Math.random() * DECOYS.length)],
  });
};
