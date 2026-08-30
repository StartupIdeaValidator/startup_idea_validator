export default function RocketIcon({ className = "w-4 h-4 text-white" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Rocket Main Body & Bullet Nose Cone */}
      <path d="M12.5 15.5L8.5 11.5C9.5 7.5 13 4 19.5 3.5C19.5 10 16.5 13.5 12.5 15.5Z" />
      
      {/* Nose Cone Separator Line */}
      <path d="M14.5 6.5L17.5 9.5" />
      
      {/* Center Circular Porthole Window */}
      <circle cx="14" cy="10" r="1.5" />
      
      {/* Left Fin */}
      <path d="M9.5 12.5L5 12L7.5 16.5" />
      
      {/* Right Fin */}
      <path d="M11.5 14.5L12 19L16.5 16.5" />
      
      {/* Thrust / Flame Exhaust */}
      <path d="M9 16C7.5 18 5.5 19.5 4.5 20.5C5.5 19.5 7 17.5 9 16Z" />
    </svg>
  );
}
