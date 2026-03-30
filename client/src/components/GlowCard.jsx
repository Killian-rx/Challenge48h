export default function GlowCard({ children, className = '', glow = 'green', hover = true }) {
  const glowMap = {
    green: 'glow-green border-cyber-green/15 hover:border-cyber-green/30',
    red: 'glow-red border-cyber-red/15 hover:border-cyber-red/30',
    blue: 'glow-blue border-cyber-blue/15 hover:border-cyber-blue/30',
    none: 'border-gray-800 hover:border-gray-700',
  };

  return (
    <div
      className={`
        glass rounded-xl p-6
        ${glowMap[glow] || glowMap.green}
        ${hover ? 'transition-all duration-300 hover:scale-[1.01]' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
