import { formatRelative } from 'date-fns';
import { enGB } from 'date-fns/locale';

export default function ReviewDisplay({
  rating,
  review,
  name,
  date,
}: {
  rating: number;
  review: string;
  name: string;
  date: { nanoseconds: number; seconds: number };
}) {
  const d = new Date(date.seconds * 1000);
  return (
    <div className='border-t py-2 mb-2'>
      <p className='text-j-dodger'>{rating} / 5</p>
      <p className='text-center text-gradient bg-gradient-to-r from-j-dodger to-j-blue text-j'>
        {review}
      </p>
      <p className='text-right'>{name}</p>
      <p className='text-right text-xs'>
        {formatRelative(d, new Date(), { locale: enGB })}
      </p>
    </div>
  );
}
