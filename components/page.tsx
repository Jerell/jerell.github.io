import Head from 'next/head';
import { ReactNode } from 'react';

const Page = ({
  title,
  children,
  hideNamePrefix = false,
}: {
  title?: string;
  children: ReactNode;
  hideNamePrefix?: boolean;
}) => {
  const titleText = () => {
    if (!title) return 'Jerell James';
    if (hideNamePrefix) return title;
    return `Jerell James | ${title}`;
  };
  return (
    <>
      <Head>
        <title>{titleText()}</title>
        <meta
          name='description'
          content='I make software for oil and gas companies'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='mx-auto'>
        <div className='flex flex-col h-screen px-2'>{children}</div>
      </main>
    </>
  );
};

export default Page;
