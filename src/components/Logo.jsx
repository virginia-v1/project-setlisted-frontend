export default function Logo() {
  return (
    <div className="logo">
      <span className="logo-dot logo-dot-pink"></span>
      <svg width="140" height="40" viewBox="0 0 220 64">
        <polygon
          points="20,32 34,4 186,4 200,32 186,60 34,60"
          fill="#4C86C6"
          stroke="#241417"
          strokeWidth="2"
        />
        <text
          x="110"
          y="34"
          fontSize="26"
          fontWeight="700"
          fill="#72243E"
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="Georgia, serif"
        >
          SetListed
        </text>
      </svg>
      <span className="logo-dot logo-dot-blue"></span>
    </div>
  )
}