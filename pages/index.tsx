import Page from '@/components/page';
import IntroCard from '@/components/introCard';
import CV from '@/components/cv';

export default function Home() {
  return (
    <>
      <Page>
        <div className='flex flex-col items-center justify-center'>
          <section className='py-8'>
            <IntroCard />
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
