import React from 'react';
import type { Metadata } from 'next';
import './globals.scss';

export const metadata: Metadata = {
  title: 'Adaptive Form',
  description: 'Adaptive Form created by Baha',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
