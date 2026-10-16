export default function ShaheenSafiSchema() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://www.safiacademy.org/#shaheen-safi",
        "name": "Shaheen Safi",
        "alternateName": [
          "شاهین صافی",
          "شاهين صافي"
        ],
        "givenName": "Shaheen",
        "familyName": "Safi",
        "gender": "Male",
        "jobTitle": "Founder, Director & Lead Fintech Systems Architect",
        "description": "Founder and Director of Safi Academy and Group CEO of Safi International Capital LTD. Full-stack FinTech engineer and computer scientist specializing in cross-border financial architectures, trading algorithms, and educational ecosystems.",
        "image": "https://www.safiacademy.org/hero.png",
        "url": "https://www.safiacademy.org/en/founder/shaheen-safi",
        "email": "shaheen@safipay.net",
        "nationality": {
          "@type": "Country",
          "name": "Afghanistan"
        },
        "alumniOf": {
          "@type": "CollegeOrUniversity",
          "name": "Istanbul Technical University",
          "sameAs": "https://www.itu.edu.tr"
        },
        "hasCredential": [
          {
            "@type": "EducationalOccupationalCredential",
            "name": "Bachelor of Computer Science (B.Sc.)",
            "recognizedBy": {
              "@type": "CollegeOrUniversity",
              "name": "Istanbul Technical University"
            }
          },
          {
            "@type": "EducationalOccupationalCredential",
            "name": "International Technical Analysis Certification",
            "recognizedBy": {
              "@type": "Organization",
              "name": "International Federation of Technical Analysts (IFTA)",
              "sameAs": "https://ifta.org"
            }
          }
        ],
        "worksFor": {
          "@type": "Organization",
          "@id": "https://www.safiacademy.org/#organization"
        },
        "founder": [
          {
            "@type": "Organization",
            "@id": "https://www.safiacademy.org/#organization"
          },
          {
            "@type": "Organization",
            "name": "Safi International Capital LTD",
            "identifier": "17063286",
            "sameAs": "https://find-and-update.company-information.service.gov.uk/company/17063286"
          }
        ],
        "knowsAbout": [
          "Financial Technology (FinTech)",
          "Computer Science & Software Architecture",
          "Algorithmic Trading & Financial Engineering",
          "Artificial Intelligence Systems",
          "International Digital Education"
        ],
        "sameAs": [
          "https://www.linkedin.com/in/shaheensafi",
          "https://www.crunchbase.com/person/shaheen-safi",
          "https://find-and-update.company-information.service.gov.uk/company/17063286"
        ]
      },
      {
        "@type": "EducationalOrganization",
        "@id": "https://www.safiacademy.org/#organization",
        "name": "Safi Academy",
        "url": "https://www.safiacademy.org",
        "logo": "https://www.safiacademy.org/logo.png",
        "founder": {
          "@id": "https://www.safiacademy.org/#shaheen-safi"
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
          }
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
