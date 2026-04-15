import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'The Youth Clock | เราเหลือเวลาวัยรุ่นเท่าไร',
  description: 'ถ้าใจเรายังไหว เราก้คือวัยรุ่น',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}
