import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  canonical?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title = "ImpoRio - Variedades de produtos na sua loja | Utensílios para Casa",
  description = "Catálogos de utensílios de casa para lojas de importados. Produtos de qualidade com preços competitivos. Solicite orçamentos via WhatsApp.",
  keywords = "utensílios para casa, catálogos, importação, China, cozinha, decoração, Rio de Janeiro, utensílios domésticos, produtos importados",
  image = "https://imporio.com.br/logoimporio.png",
  url = "https://imporio.com.br",
  type = "website",
  canonical
}) => {
  const fullUrl = canonical || url;
  
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="ImpoRio" />
      <meta property="og:locale" content="pt_BR" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@imporio" />
      
      {/* Canonical */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Structured Data for Organization */}
      <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "ImpoRio",
        "alternateName": "ImpoRio Comércio Exterior",
        "description": "Especialistas em importação de utensílios para casa diretamente da China",
        "url": "https://imporio.com.br",
        "logo": "https://imporio.com.br/logo.png",
        "image": image,
        "sameAs": [
          "https://www.instagram.com/impo.riocomercioexterior/",
          "https://wa.me/5521996098810"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+55-21-99609-8810",
          "contactType": "customer service",
          "availableLanguage": "Portuguese"
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Rio de Janeiro",
          "addressRegion": "RJ",
          "addressCountry": "BR"
        },
        "areaServed": "BR",
        "serviceType": "Importação de Utensílios Domésticos"
      })}
      </script>
    </Helmet>
  );
}; 