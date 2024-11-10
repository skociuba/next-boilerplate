import { NextIntlClientProvider, useMessages } from 'next-intl';
import { Inter } from 'next/font/google';

import './styles/globals.css';
import Navbar from './components/Navbar';
import ReactQueryProvider from './providers/ReactQueryProvider';
import { ThemeProvider } from './providers/ThemeProvider';
const inter = Inter({ subsets: ['latin'] });

type RootLayoutProps = { children: React.ReactNode; params: { locale: string } };

export default function RootLayout({ children, params: { locale } }: RootLayoutProps) {
  const messages = useMessages();

  return (
    <html lang={locale}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <body className={inter.className}>
          <ThemeProvider attribute="class">
            <div className="mx-auto max-w-6xl">
              <ReactQueryProvider>
                <Navbar />
                {children}
              </ReactQueryProvider>
            </div>
          </ThemeProvider>
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
