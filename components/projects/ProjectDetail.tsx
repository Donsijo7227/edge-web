// components/projects/ProjectDetail.tsx
'use client'
import React, { useState, useEffect } from 'react';
import { client, urlFor } from '@/sanity/lib/client';
import { PortableText } from '@portabletext/react';
import { Calendar } from 'lucide-react';

interface Project {
  _id: string;
  title: string;
  mainImage: any;
  content: any[];
  status: string;
  startDate?: string;
  endDate?: string;
}

interface ProjectDetailProps {
  slug: string;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ slug }) => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProject() {
      if (!slug) {
        setError('No project specified');
        setLoading(false);
        return;
      }

      try {
        const data = await client.fetch(`
          *[_type == "project" && slug.current == $slug][0] {
            _id,
            title,
            mainImage,
            content,
            status,
            startDate,
            endDate
          }
        `, { slug });

        if (!data) {
          setError(`Project "${slug}" not found`);
          setLoading(false);
          return;
        }

        setProject(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching project:', error);
        setError('Failed to load project. Please try again later.');
        setLoading(false);
      }
    }

    fetchProject();
  }, [slug]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const componentMap = {
    block: {
      normal: ({ children }: any) => <p className="mb-4">{children}</p>,
      h1: ({ children }: any) => <h1 className="text-3xl font-bold my-6">{children}</h1>,
      h2: ({ children }: any) => <h2 className="text-2xl font-bold my-5">{children}</h2>,
      h3: ({ children }: any) => <h3 className="text-xl font-bold my-4">{children}</h3>,
      h4: ({ children }: any) => <h4 className="text-lg font-bold my-3">{children}</h4>,
      blockquote: ({ children }: any) => (
        <blockquote className="border-l-4 border-green-500 pl-4 italic my-4">{children}</blockquote>
      ),
    },
    list: {
      bullet: ({ children }: any) => <ul className="list-disc pl-5 mb-4">{children}</ul>,
      number: ({ children }: any) => <ol className="list-decimal pl-5 mb-4">{children}</ol>,
    },
    listItem: {
      bullet: ({ children }: any) => <li className="mb-1">{children}</li>,
      number: ({ children }: any) => <li className="mb-1">{children}</li>,
    },
  };

  if (loading) {
    return (
      <div className="w-full px-5 py-8">
        <p>Loading project...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full px-5 py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="w-full px-5 py-8">
        <p>Project not found.</p>
      </div>
    );
  }

  return (
    <div className="w-full px-5 pt-mobile-block pb-mobile-block md:pt-desktop-block md:pb-desktop-block">
      <article className="max-w-4xl mx-auto">
        {/* Hero Image */}
        <div className="mb-8 relative rounded-lg overflow-hidden h-96">
          {project.mainImage ? (
            <img
              src={urlFor(project.mainImage).width(1200).height(800).url()}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No image available</span>
            </div>
          )}
        </div>

        {/* Title and Status */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
          <div className="flex flex-wrap gap-4">
            {project.status && (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                {project.status.charAt(0).toUpperCase() +
                  project.status.slice(1)}
              </span>
            )}

            {(project.startDate || project.endDate) && (
              <div className="flex items-center text-gray-600 text-sm">
                <Calendar className="w-4 h-4 mr-1" />
                {project.startDate && (
                  <span>
                    {formatDate(project.startDate)}
                    {project.endDate && ` - ${formatDate(project.endDate)}`}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Project Content */}
        <div className="prose max-w-none">
          <PortableText value={project.content} components={componentMap} />
        </div>
      </article>
    </div>
  );
};


export default ProjectDetail;