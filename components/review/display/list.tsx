import ReviewDisplay from '.';

const fakeReview = (
  rating: number,
  review: string,
  name: string,
  date: string
) => ({
  rating,
  review,
  name,
  date,
});

const fakeReviews = [
  fakeReview(5, 'wow he good', 'Anonymous', '2022-08-13'),
  fakeReview(3, 'wow he cool', 'Anonymous', '2022-08-09'),
  fakeReview(5, 'wow he swag', 'Anonymous', '2022-08-06'),
  fakeReview(4, 'wow he nice', 'Anonymous', '2022-08-04'),
  fakeReview(
    5,
    'Mauris sagittis nisl ac accumsan tincidunt. Maecenas bibendum quam at tincidunt venenatis. Integer aliquam quam at nulla vestibulum, sed aliquam augue sagittis.',
    'Anonymous',
    '2022-08-01'
  ),
  fakeReview(1, 'he made me addicted to grugs', 'Real Person', '2022-07-13'),
];

export default function ReviewList() {
  return (
    <div className='flex flex-col gap-4'>
      {fakeReviews.map((info, i) => (
        <ReviewDisplay {...info} key={i} />
      ))}
    </div>
  );
}
