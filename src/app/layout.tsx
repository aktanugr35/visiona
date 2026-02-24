import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import ConditionalNavbar from "@/components/layout/ConditionalNavbar";

export const metadata: Metadata = {
  metadataBase: new URL('https://visiona.ai'),
  title: {
    default: 'visionA — Sosyal Medya AI Ajansı',
    template: '%s | visionA',
  },
  description: 'AI destekli içerik üretimi ve sosyal medya yönetimiyle markanızı büyütün. visionA ile 48 saatte teslimat garantisi.',
  keywords: ['sosyal medya ajansı', 'AI içerik', 'yapay zeka', 'sosyal medya yönetimi', 'Instagram yönetimi', 'dijital ajans'],
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://visiona.ai',
    siteName: 'visionA',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@visionaai',
    creator: '@visionaai',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              name: 'visionA',
              description: 'Sosyal Medya AI Ajansı',
              url: 'https://visiona.ai',
              logo: 'https://visiona.ai/logo.png',
              serviceType: 'Social Media Marketing',
              areaServed: 'TR',
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Sosyal Medya Hizmetleri',
                itemListElement: [
                  { '@type': 'Offer', name: 'AI İçerik Üretimi' },
                  { '@type': 'Offer', name: 'Sosyal Medya Yönetimi' },
                  { '@type': 'Offer', name: 'AI Reklam Kreatifleri' },
                  { '@type': 'Offer', name: 'Strateji & Analitik' },
                ],
              },
            }),
          }}
        />
      </head>
      <body>
        <ConditionalNavbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
