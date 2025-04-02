// app/studio/layout.tsx
'use client'
export default function StudioLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className="studio-container">
        <style jsx global>{`
          header, nav, footer {
            display: none !important;
          }
          
         
          .navbar, .site-footer {
            display: none !important;
          }
          
         
          .studio-container {
            width: 100%;
            height: 100%;
          }
        `}</style>
        {children}
      </div>
    )
  }