import Head from 'next/head';
import Page from '@/components/page';
import { DisplayText } from '@/components/DisplayText';
import Link from 'next/link';
import CircleImg from '@/components/CircleImg';

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
        <section>
          <div className='flex justify-center'>
            <div className='my-10 flex space-x-8 items-center'>
              <div className='left'>
                <CircleImg />
              </div>
              <div className='right flex flex-col'>
                <p>Jerell James</p>
                <DisplayText>Software engineer</DisplayText>
                <p>I make software for oil and gas companies.</p>
                <p>
                  Take a look at my{' '}
                  <Link href='https://github.com/Jerell'>
                    <a>
                      <span>github</span>
                    </a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </Page>
    </>
  );
}
