import libraryBg from '@/assets/library-background.jpg';

export function BookshelfSilhouette() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Library background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url(${libraryBg})` }}
      />
      
      {/* Depth overlay - creates the sense of being inside */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(90deg, hsl(25 30% 8% / 0.95) 0%, transparent 20%, transparent 80%, hsl(25 30% 8% / 0.95) 100%),
            linear-gradient(180deg, hsl(25 30% 8% / 0.7) 0%, transparent 30%, transparent 70%, hsl(28 35% 12% / 0.9) 100%)
          `,
        }}
      />
      
      {/* Left bookshelf silhouette */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24">
        <div 
          className="h-full"
          style={{
            background: `
              repeating-linear-gradient(
                180deg,
                hsl(28 30% 12%) 0px,
                hsl(28 30% 12%) 30px,
                hsl(30 25% 15%) 30px,
                hsl(30 25% 15%) 32px
              )
            `,
            opacity: 0.8,
          }}
        />
        {/* Book spines suggestion */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              repeating-linear-gradient(
                0deg,
                transparent 0px,
                transparent 28px,
                hsl(35 20% 18% / 0.6) 28px,
                hsl(35 20% 18% / 0.6) 30px
              )
            `,
          }}
        />
      </div>

      {/* Right bookshelf silhouette */}
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24">
        <div 
          className="h-full"
          style={{
            background: `
              repeating-linear-gradient(
                180deg,
                hsl(28 30% 12%) 0px,
                hsl(28 30% 12%) 30px,
                hsl(30 25% 15%) 30px,
                hsl(30 25% 15%) 32px
              )
            `,
            opacity: 0.8,
          }}
        />
      </div>

      {/* Vignette effect for depth */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, transparent 30%, hsl(25 30% 6% / 0.5) 100%)',
        }}
      />
    </div>
  );
}
