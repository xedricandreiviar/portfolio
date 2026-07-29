import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Xedric Andrei Viar | Full-Stack Developer",
  description:
    "Full-stack web developer from the Philippines building production apps like Xiron and Coffee Chapters.",
  keywords: [
    "xedric andrei viar",
    "full-stack developer philippines",
    "web developer portfolio",
    "filipino developer",
    "nextjs portfolio",
  ],
  authors: [{ name: "Xedric Andrei Viar" }],
  creator: "Xedric Andrei Viar",
  openGraph: {
    title: "Xedric Andrei Viar | Full-Stack Developer",
    description:
      "Full-stack web developer from the Philippines building production apps like Xiron and Coffee Chapters.",
    url: "https://codewithxed.vercel.app",
    images: ["/images/profile.png"],
    siteName: "Xedric Andrei Viar",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Xedric Andrei Viar | Full-Stack Developer",
    description:
      "Full-stack web developer from the Philippines building production apps like Xiron and Coffee Chapters.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const themeScript = `
  (function() {
    var theme = localStorage.getItem('theme');
    if (!theme) {
      theme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    document.documentElement.setAttribute('data-theme', theme);
  })();
`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Xedric Andrei Viar",
  jobTitle: "Full-Stack Web Developer",
  url: "https://codewithxed.vercel.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="relative min-h-screen overflow-x-hidden bg-bg-primary font-body text-text-primary">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-accent focus:px-4 focus:py-2 focus:text-text-dark focus:outline-none"
        >
          Skip to main content
        </a>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
