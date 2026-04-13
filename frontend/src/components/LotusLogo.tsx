const LotusLogo = ({ className = "w-24 h-24" }: { className?: string }) => {
  return (
    <div className={`${className} relative`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Outer petals */}
        <path
          d="M50 20 C55 35 65 40 75 35 C65 45 60 55 50 50 C40 55 35 45 25 35 C35 40 45 35 50 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-gold"
        />
        <path
          d="M30 30 C40 40 40 55 35 70 C45 55 50 50 50 50 C50 50 55 55 65 70 C60 55 60 40 70 30"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-gold"
        />
        {/* Inner petals */}
        <path
          d="M50 35 C52 42 56 45 62 43 C56 47 54 52 50 50 C46 52 44 47 38 43 C44 45 48 42 50 35"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-gold-light"
        />
        {/* Center */}
        <circle
          cx="50"
          cy="48"
          r="4"
          fill="currentColor"
          className="text-gold"
        />
        {/* Decorative dots */}
        <circle
          cx="50"
          cy="25"
          r="1.5"
          fill="currentColor"
          className="text-gold-light"
        />
        <circle
          cx="35"
          cy="35"
          r="1.5"
          fill="currentColor"
          className="text-gold-light"
        />
        <circle
          cx="65"
          cy="35"
          r="1.5"
          fill="currentColor"
          className="text-gold-light"
        />
        <circle
          cx="30"
          cy="50"
          r="1.5"
          fill="currentColor"
          className="text-gold-light"
        />
        <circle
          cx="70"
          cy="50"
          r="1.5"
          fill="currentColor"
          className="text-gold-light"
        />
        <circle
          cx="40"
          cy="65"
          r="1.5"
          fill="currentColor"
          className="text-gold-light"
        />
        <circle
          cx="60"
          cy="65"
          r="1.5"
          fill="currentColor"
          className="text-gold-light"
        />
      </svg>
    </div>
  );
};

export default LotusLogo;
