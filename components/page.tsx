import Head from 'next/head';

interface Props {
  title?: string;
  children: React.ReactNode;
}

const Page = ({ title, children }: Props) => (
  <>
    {title ? (
      <Head>
        <title>Jerell James | {title}</title>
      </Head>
    ) : null}

    <main className='mx-auto'>
      <div className='flex flex-col h-screen px-2'>{children}</div>
    </main>
  </>
);

export default Page;
