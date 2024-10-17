import { Inter } from 'next/font/google';

import './styles/globals.css';
import { NextIntlClientProvider, useMessages } from 'next-intl';

import Navbar from './components/navbar';
import ReactQueryProvider from './providers/ReactQueryProvider';
const inter = Inter({ subsets: ['latin'] });

type RootLayoutProps = { children: React.ReactNode; params: { locale: string } };

export default function RootLayout({ children, params: { locale } }: RootLayoutProps) {
  const messages = useMessages();

  return (
    <html lang={locale}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <body className={inter.className}>
          <div className="mx-auto max-w-6xl">
            <ReactQueryProvider>
              <Navbar />
              {children}
            </ReactQueryProvider>
          </div>
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
