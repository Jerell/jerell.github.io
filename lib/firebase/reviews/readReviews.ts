import { db } from '../initFirebase';
import readData from '../readData';
import { IReviewData } from './IReview';

export default async function readReviews() {
  return (await readData(db, 'reviews')) as IReviewData[];
}
