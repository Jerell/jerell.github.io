import addReview from '@/lib/firebase/reviews/addReview';
import IReview from '@/lib/firebase/reviews/IReview';
import { useState } from 'react';
import Rating from './rating';
import SubmitButton from './SubmitButton';

export default function Form({ refresh }: { refresh: () => Promise<void> }) {
  const [rating, setRating] = useState<number>(-1);
  const [review, setReview] = useState<string>('');
  const [name, setName] = useState<string>('Anonymous');
  const reviewPlaceholder = 'he was very gentle and kind and rubbed my tummy';
  const invalid = review.length === 0 || rating < 0;

  const [loading, setLoading] = useState<boolean>(false);

  async function submit() {
    setLoading(true);
    const body: IReview = {
      rating: rating + 1,
      review,
      name,
      date: new Date(),
      approved: false,
    };
    if (invalid) return;
    await addReview(body);
    await refresh();
    setLoading(false);
  }

  return (
    <form
      className={`flex flex-col gap-2 ${
        loading ? 'opacity-80' : 'opacity-100'
      }`}
    >
      <Rating update={setRating} />
      <textarea
        name='review'
        id='review'
        cols={30}
        rows={10}
        placeholder={reviewPlaceholder}
        onChange={(e) => setReview(e.target.value)}
        disabled={loading}
      ></textarea>
      <input
        type='text'
        name='name'
        id='name'
        autoComplete='name'
        placeholder='name (optional)'
        onChange={(e) => setName(e.target.value)}
        disabled={loading}
      />
      <SubmitButton submit={submit} disabled={invalid || loading} />
    </form>
  );
}
