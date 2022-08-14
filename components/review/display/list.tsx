import { IReviewData } from '@/lib/firebase/reviews/IReview';
import ReviewDisplay from '.';

export default function ReviewList({ reviews }: { reviews: IReviewData[] }) {
  return (
    <div className='flex flex-col gap-4'>
      {reviews.map((info, i) => (
        <ReviewDisplay {...info} key={i} />
      ))}
    </div>
  );
}
