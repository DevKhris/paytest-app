'use client';

import { useState, useEffect } from 'react';
import { useTheme } from './theme-provider';

export default function SessionMonitor() {
  const [showSprite, setShowSprite] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleActivate = () => {
      setShowSprite(true);
      setTimeout(() => setShowSprite(false), 2500);
    };

    window.addEventListener('gameSprite', handleActivate);
    return () => window.removeEventListener('gameSprite', handleActivate);
  }, []);

  if (!showSprite) return null;

  return (
    <>
      <div className="fixed bottom-16 left-0 z-50 pointer-events-none"
           style={{ animation: 'spriteRun 2.3s linear forwards' }}>
        <img 
          src="https://dinopixel.com/preload/0722/Chrome-Dino.webp" 
          alt=""
          width={176}
          height={94}
          className="w-44 h-auto"
          style={{ 
            imageRendering: 'pixelated',
            filter: theme === 'dark' ? 'invert(1)' : 'none'
          }}
        />
      </div>
      
      <style jsx>{`
        @keyframes spriteRun {
          0% { transform: translateX(-200px); }
          100% { transform: translateX(calc(100vw + 200px)); }
        }
      `}</style>
    </>
  );
}
