import Header from '@/components/Header';
import '../globals.css';
import { Charis_SIL } from 'next/font/google';
import clsxm from '@/lib/clsxm';

const charis = Charis_SIL({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-charis',
});

export const metadata = {
  title: 'Jerell James',
  description: 'Software engineer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={clsxm([
          charis.className,
          'flex flex-col justify-between items-center pb-1',
        ])}
      >
        <main className='flex flex-col items-center h-full grow w-full p-2'>
          {children}
        </main>
        <a href='#header'>Back to top</a>
      </body>
    </html>
  );
}
