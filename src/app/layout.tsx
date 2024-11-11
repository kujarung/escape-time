import type { Metadata } from 'next';
import '@/assets/scss/index.scss';
import { AntdRegistry } from '@ant-design/nextjs-registry';

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
      <AntdRegistry>
        <body>{children}</body>
      </AntdRegistry>
    </html>
  );
}
