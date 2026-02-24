
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';

import Header from '@/components/Header/Header';

import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

import Footer from '@/components/Footer/Footer';

export const metadata: Metadata = {
  title: 'NoteHub',
  description:
    'A modern platform for creating, organizing, and sharing notes in one place.',
  metadataBase: new URL('https://08-zustand-nine-omega.vercel.app/'),
  openGraph: {
    title: `NoteHub`,
    description:
      'A modern platform for creating, organizing, and sharing notes in one place.',
    url: `https://08-zustand-nine-omega.vercel.app/`,
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub',
      },
    ],
    type: 'article',
  },
};

const roboto = Roboto({
  subsets: ['latin'], 
  weight: ['400', '700'],
  variable: '--font-roboto', 
  display: 'swap', 
});


export default function RootLayout({
  children,
  modal,
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        <TanStackProvider>
          <Header />
          <main>
            {children}
            {modal}
            <div id="modal-root" />
          </main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
