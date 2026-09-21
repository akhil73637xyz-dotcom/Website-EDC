import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCTABar } from "@/components/layout/MobileCTABar";
import { ConsultPopup } from "@/components/lead/ConsultPopup";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { ScrollProgress } from "@/components/motion";
import { SITE_URL, site } from "@/lib/site";
import { clinicSchema, graph, organizationSchema, websiteSchema } from "@/lib/schema";

/** Google tag (gtag.js) measurement ID for this site's Google account. */
const GOOGLE_TAG_ID = "G-92YRJYVKFE";

/** Display serif — the wordmark and every headline. */
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

/** UI/body sans — humanist, warm, holds up at small sizes on mobile. */
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Best Dental Clinic in Prayagraj | Eclectic Dental Care",
    template: "%s | Eclectic Dental Care",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "dental clinic in Prayagraj",
    "dentist in Prayagraj",
    "best dentist in Allahabad",
    "Invisalign Prayagraj",
    "orthodontist in Prayagraj",
    "braces treatment Prayagraj",
    "root canal treatment Prayagraj",
    "dental implants Prayagraj",
    "dentist in Civil Lines Prayagraj",
    "Eclectic Dental Care",
  ],
  authors: [{ name: site.name, url: SITE_URL }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: site.name,
    title: "Best Dental Clinic in Prayagraj | Eclectic Dental Care",
    description: site.description,
    images: [
      {
        url: "/brand/logo-lockup.webp",
        width: 800,
        height: 800,
        alt: `${site.name} — ${site.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eclectic Dental Care — Certified Invisalign Provider, Prayagraj",
    description: site.description,
    images: ["/brand/logo-lockup.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Health",
  other: {
    "geo.region": "IN-UP",
    "geo.placename": "Prayagraj",
    "geo.position": `${site.geo.lat};${site.geo.lng}`,
    ICBM: `${site.geo.lat}, ${site.geo.lng}`,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FBF7F2" },
    { media: "(prefers-color-scheme: dark)", color: "#241B16" },
  ],
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const siteGraph = graph(clinicSchema(), organizationSchema(), websiteSchema());

  return (
    <html
      lang="en-IN"
      className={`${cormorant.variable} ${jakarta.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        {/* Google tag (gtag.js) — must stay the first child of <head>, and appear only once. */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`} />
        <script
          // Static, developer-authored snippet from Google — no user input reaches this.
          dangerouslySetInnerHTML={{
            __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${GOOGLE_TAG_ID}');
`,
          }}
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <script
          type="application/ld+json"
          // Static, developer-authored schema — no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteGraph) }}
        />
      </head>
      <body className="min-h-full antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brick focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>

        <SmoothScroll>
          <ScrollProgress />
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <MobileCTABar />
          {/* Inside SmoothScroll: the popup calls lenis.stop() while it is open. */}
          <ConsultPopup />
          {/* Clears the sticky mobile bar so it never covers footer content. */}
          <div aria-hidden className="h-16 lg:hidden" />
        </SmoothScroll>
      </body>
    </html>
  );
}
