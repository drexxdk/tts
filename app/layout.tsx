import TTSPlayer from "@/features/tts/components/TTSPlayer";
import "@/public/styles/globals.css";
import type { Metadata } from "next";
import Image from "next/image";

import logoIcon from "@/public/svg/logo.svg";
import { BsGithub } from "react-icons/bs";

export const metadata: Metadata = {
  title: "TTS + Highlight",
  description: "Text-to-Speech + Highlight by Frederik Nielsen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="TTS + Highlight" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </head>
      <body className={`antialiased flex flex-col min-h-full`}>
        <header className="bg-orange-700 sticky top-0">
          <div className="container py-4 flex justify-between items-center gap-4 flex-wrap min-h-20">
            <h1 className="text-3xl font-black inline-flex gap-4 items-center">
              <Image
                width={32}
                height={32}
                priority
                src={logoIcon}
                alt="Follow us on Twitter"
              />{" "}
              TTS + Highlight
            </h1>
            <TTSPlayer />
          </div>
        </header>
        <main className="grow">
          <div className="container py-8">{children}</div>
        </main>
        <footer className="bg-zinc-900">
          <div className="container py-4 flex gap-4 flex-wrap justify-between">
            <p>Made by Frederik Nielsen</p>
            <a
              href="https://github.com/drexxdk/tts-highlight"
              className="underline hover:no-underline text-orange-300 inline-flex items-center gap-2"
            >
              <BsGithub size={24} />
              <span>Github</span>
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
