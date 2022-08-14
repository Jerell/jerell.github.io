import addData from '../addData';
import { db } from '../initFirebase';
import IReview from './IReview';

export default async function addReview(review: IReview) {
  return await addData(db, 'reviews', review);
}
