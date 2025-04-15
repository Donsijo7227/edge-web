// components/sections/TextSection.tsx
import { PortableText } from '@portabletext/react';
import { PortableTextComponents } from '@portabletext/react';


interface TextSectionProps {
  section: {
    heading?: string;
    content?: any;
  };
}

const components: PortableTextComponents = {
  marks: {
    link: ({ value, children }: { value: any, children: React.ReactNode }) => {
      const { href, blank } = value;
      return blank ? 
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-edge-green-dark hover:underline">{children}</a> :
        <a href={href} className="text-edge-green-dark hover:underline">{children}</a>;
    }
  } as any
};

export default function TextSection({ section }: TextSectionProps) {
  return (
    <div className="prose max-w-none">
      {section.heading && (
        <h2 className="heading-2 text-edge-green-dark mb-6">{section.heading}</h2>
      )}
      
      {section.content && (
        <div className="body-text text-black">
          <PortableText value={section.content} components={components} />
        </div>
      )}
    </div>
  );
}