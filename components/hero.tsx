interface HeroProps {
  title?: string;
  backgroundImage: string;
}

export default function Hero({ title, backgroundImage }: HeroProps) {
  return (
    <section 
      className="relative w-full h-[50vh] md:h-96  flex items-end bg-cover bg-center "
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Dark Overlay for Readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Title Positioned at Bottom-Left */}
      <div className="relative z-10 w-full px-4 sm:px-6 md:pl-10 pb-10">
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold text-left">
          {title}
        </h1>
      </div>
    </section>
  );
}
