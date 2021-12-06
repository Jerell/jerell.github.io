import Head from 'next/head';
import Page from '@/components/page';
import { DisplayText } from '@/components/DisplayText';
import IntroCard from '@/components/introCard';
import Item from '@/components/item';
import CV from '@/components/cv';

export default function Home() {
  return (
    <>
      <Head>
        <title>Jerell James</title>
        <meta
          name='description'
          content='I make software for oil and gas companies'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Page>
        <div className='flex flex-col items-center justify-center'>
          <section>
            <div className='my-8'>
              <IntroCard />
            </div>
          </section>
          <section>
            <div>
              <CV />
            </div>
          </section>
        </div>
      </Page>
    </>
  );
}
