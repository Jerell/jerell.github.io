import { IReviewData } from '@/lib/firebase/reviews/IReview';
import { useState } from 'react';
import ReviewDisplay from '.';
import Select from '../input/select';

export default function ReviewList({ reviews }: { reviews: IReviewData[] }) {
  const scoreFilter = (n: number) => () => reviews.filter((r) => r.rating == n);
  const filters = {
    'Filter by rating': () => reviews,
    '★★★★★': scoreFilter(5),
    '★★★★': scoreFilter(4),
    '★★★': scoreFilter(3),
    '★★': scoreFilter(2),
    '★': scoreFilter(1),
  };
  const filterOptions = Object.keys(filters);
  const [ratingFilter, setRatingFilter] = useState<string>(filterOptions[0]);

  const reviewSorter = (
    sortFunction: (a: IReviewData, b: IReviewData) => number
  ) => {
    return (arr: IReviewData[]) => arr.sort(sortFunction);
  };
  const sorters = {
    'Sort by date (most recent)': reviewSorter(
      (a, b) =>
        new Date(b.date.seconds * 1000).getTime() -
        new Date(a.date.seconds * 1000).getTime()
    ),
    'Sort by date (oldest)': reviewSorter(
      (a, b) =>
        new Date(a.date.seconds * 1000).getTime() -
        new Date(b.date.seconds * 1000).getTime()
    ),
  };
  const sortOptions = Object.keys(sorters);
  const [sort, setSort] = useState<string>(sortOptions[0]);

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col gap-2'>
        <Select label='sort' options={sortOptions} update={setSort} />
        <Select
          label='rating filter'
          options={filterOptions}
          update={setRatingFilter}
        />
      </div>
      {sorters[sort](filters[ratingFilter]()).map((info, i) => (
        <ReviewDisplay {...info} key={i} />
      ))}
    </div>
  );
}
