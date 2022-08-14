import Page from '@/components/page';
import { DisplayText } from '@/components/DisplayText';
import Form from '@/components/review/input/form';
import IntroCard from '@/components/introCard';
import ReviewList from '@/components/review/display/list';
import { IReviewData } from '@/lib/firebase/reviews/IReview';
import readReviews from '@/lib/firebase/reviews/readReviews';
import { useState, useEffect } from 'react';

export default function Review() {
  const [data, setData] = useState<IReviewData[]>([]);
  async function update() {
    setData(await readReviews());
  }
  useEffect(() => {
    update();
  }, []);

  return (
    <>
      <Page title='Leave a review' hideNamePrefix>
        <div className='flex flex-col items-center justify-center'>
          <div className='max-w-prose w-full'>
            <section className='py-8 flex flex-col gap-4'>
              <IntroCard />
              <p>
                maybe a paragraph of information or something idk you can put
                anything here u choose homie
              </p>
            </section>
            <section className='mt-8'>
              <div className='my-2 text-center'>
                <DisplayText>Leave a review</DisplayText>
              </div>
            </section>
            <section className='flex flex-col gap-1'>
              <Form refresh={update} />
            </section>
            <section className='mt-8'>
              <ReviewList reviews={data} />
            </section>
          </div>
        </div>
      </Page>
    </>
  );
}
