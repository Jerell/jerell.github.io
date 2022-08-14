export default interface IReview {
  rating: number;
  review: string;
  name: string;
  date: Date;
  approved: boolean;
}

export interface IReviewData {
  rating: number;
  review: string;
  name: string;
  date: { nanoseconds: number; seconds: number };
  approved: boolean;
}
