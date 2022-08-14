import addReview from '@/lib/firebase/reviews/addReview';
import IReview from '@/lib/firebase/reviews/IReview';
import { useState } from 'react';
import Rating from './rating';
import SubmitButton from './SubmitButton';

export default function Form() {
  const [rating, setRating] = useState<number>(-1);
  const [review, setReview] = useState<string>('');
  const [name, setName] = useState<string>('Anonymous');
  const reviewPlaceholder = 'he was very gentle and kind and rubbed my tummy';
  const invalid = review.length === 0 || rating < 0;

  function submit() {
    const body: IReview = {
      rating: rating + 1,
      review,
      name,
      date: new Date(),
      approved: false,
    };
    if (invalid) return;
    addReview(body);
  }

  return (
    <form className='flex flex-col gap-2'>
      <Rating update={setRating} />
      <textarea
        name='review'
        id='review'
        cols={30}
        rows={10}
        placeholder={reviewPlaceholder}
        onChange={(e) => setReview(e.target.value)}
      ></textarea>
      <input
        type='text'
        name='name'
        id='name'
        autoComplete='name'
        placeholder='name (optional)'
        onChange={(e) => setName(e.target.value)}
      />
      <SubmitButton submit={submit} disabled={invalid} />
    </form>
  );
}
