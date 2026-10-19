import React from 'react';

interface BackgroundLayerProps {
  context: 'hero' | 'auth' | 'dashboard' | 'none';
  children?: React.ReactNode;
}

export const BackgroundLayer: React.FC<BackgroundLayerProps> = ({ context, children }) => {
  const bgImage = '/images/bg-balaikota-depok.jpg';

  if (context === 'none') {
    return <div className="min-h-screen bg-slate-50 text-slate-800">{children}</div>;
  }

  if (context === 'hero') {
    return (
      <div className="relative min-h-screen w-full overflow-hidden bg-[#07192C]">
        {/* Crisp photo background */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-700 scale-105"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
        {/* Directional gradient overlay as specified in PRD 3.1 */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#0B2A4A]/95 via-[#0B2A4A]/80 to-[#0B2A4A]/40" />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#07192C] via-transparent to-black/30" />
        
        {/* Content container */}
        <div className="relative z-10 w-full min-h-screen">
          {children}
        </div>
      </div>
    );
  }

  if (context === 'auth') {
    return (
      <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#07192C] p-4 sm:p-6">
        {/* Balaikota photo background */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center filter blur-[2px]"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
        {/* Overlay #0B2A4A/75 */}
        <div className="absolute inset-0 z-0 bg-[#0B2A4A]/80 backdrop-blur-sm" />
        
        {/* Centered Glass content */}
        <div className="relative z-10 w-full max-w-md">
          {children}
        </div>
      </div>
    );
  }

  // Dashboard context: foto sangat samar (6-8%) di atas slate-50, tidak mengganggu tabel/grafik
  return (
    <div className="relative min-h-screen w-full bg-slate-50">
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center pointer-events-none opacity-[0.07] select-none"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
};
