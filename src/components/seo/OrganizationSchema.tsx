export default function OrganizationSchema() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        "@id": "https://www.safiacademy.org/#organization",
        "name": "Safi Academy",
        "alternateName": ["آکادمی صافی", "Safi Academy Global"],
        "url": "https://www.safiacademy.org",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.safiacademy.org/logo.png",
          "width": "512",
          "height": "512"
        },
        "description": "Premier international educational platform and academy providing world-class online courses, global verified scholarships, AI engineering, trading, and digital business masterclasses.",
        "founder": {
          "@type": "Person",
          "@id": "https://www.safiacademy.org/#shaheen-safi",
          "name": "Shaheen Safi",
          "jobTitle": "Founder & Director"
        },
        "parentOrganization": {
          "@type": "Organization",
          "name": "Safi International Capital LTD",
          "legalName": "Safi International Capital LTD",
          "identifier": "17063286",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "71-75 Shelton Street, Covent Garden",
            "addressLocality": "London",
            "postalCode": "WC2H 9JQ",
            "addressCountry": "GB"
          },
          "sameAs": "https://find-and-update.company-information.service.gov.uk/company/17063286"
        },
        "sameAs": [
          "https://www.linkedin.com/in/shaheensafi",
          "https://www.instagram.com/top_g_official1",
          "https://www.facebook.com/share/1H1vuV1i9Z/",
          "https://find-and-update.company-information.service.gov.uk/company/17063286"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://www.safiacademy.org/#website",
        "url": "https://www.safiacademy.org",
        "name": "Safi Academy",
        "publisher": {
          "@id": "https://www.safiacademy.org/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://www.safiacademy.org/en/courses?search={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
