import React, { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'Navya Ed Tech | Professional IT Education & Technology Training in Nepal',
  description = 'Practical IT education designed around modern technologies, real projects, and career-ready skills. Learn technology from the company that builds technology.'
}) => {
  useEffect(() => {
    document.title = title.includes('Navya Ed Tech') ? title : `${title} | Navya Ed Tech`;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
  }, [title, description]);

  return null;
};
