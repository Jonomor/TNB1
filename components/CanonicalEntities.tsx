import React from 'react';
import { Helmet } from 'react-helmet-async';

export const CanonicalEntities: React.FC = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": "https://theneutralbridge.com/#work",
    "name": "The Neutral Bridge",
    "url": "https://theneutralbridge.com",
    "description": "The Neutral Bridge is a financial infrastructure research and analysis publication focused on understanding settlement systems, data flows, and systemic financial architecture.",
    "author": {
      "@id": "https://jonomor.com/ali-morgan#person"
    },
    "publisher": {
      "@id": "https://jonomor.com/#organization"
    },
    "isPartOf": {
      "@id": "https://jonomor.com/#organization"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
};

export default CanonicalEntities;
