import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "../scss/_import.scss";
import { SITE_URL } from "@/lib/site";

const GTM_ID = "GTM-MGFDQP68";

// Defaults for every route; website pages set their own tags in src/lib/seo.ts. Icons are file
// conventions in this folder: favicon.ico, icon.png (192px) and apple-icon.png (180px).
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "DocStar",
  title: "DocStar: API documentation for people and AI agents",
  description: "Paste one prompt into your coding agent. DocStar turns your code into API docs, llms.txt, a hosted MCP server and a CLI, and keeps them in sync.",
  openGraph: { type: "website", siteName: "DocStar", locale: "en_US" },
  twitter: { card: "summary_large_image" },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f7f7f2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
      </head>
      <body className="antialiased overflow-x-hidden">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
