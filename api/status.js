module.exports = (_req, res) => {
  return res.status(200).json({
    threat_level: 'CRITIQUE',
    compromised_nodes: Math.floor(Math.random() * 20) + 30,
    active_connections: Math.floor(Math.random() * 500) + 100,
    firewall_status: 'CONTOURNE',
    uptime: `${Math.floor(Math.random() * 72)}h ${Math.floor(Math.random() * 60)}m`,
  });
};
