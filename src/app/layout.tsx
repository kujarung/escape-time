import type { Metadata } from 'next';
import '@/assets/scss/index.scss';
import Header from '@/components/common/Header';

export const metadata: Metadata = {
  title: 'Escape Time',
  description: 'Escape Time',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <main>
          <Header />

          {children}
        </main>
      </body>
    </html>
  );
}
