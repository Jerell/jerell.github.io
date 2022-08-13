import { formatRelative } from 'date-fns';

export default function ReviewDisplay({
  rating,
  review,
  name,
  date,
}: {
  rating: number;
  review: string;
  name: string;
  date: string;
}) {
  return (
    <div className='border-t py-2 mb-2'>
      <p className='text-j-dodger'>{rating} / 5</p>
      <p className='text-center text-gradient bg-gradient-to-r from-j-dodger to-j-blue text-j'>
        {review}
      </p>
      <p className='text-right'>{name}</p>
      <p className='text-right text-xs'>
        {formatRelative(new Date(date), new Date())}
      </p>
    </div>
  );
}
