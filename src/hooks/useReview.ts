import yelp from '../api/yelp';
import { useQuery } from 'react-query';

type ReviewResponse = {
 reviews: Review[];
 total: number;
 possible_languages: string[];
};

type Review = {
 id: string;
 url: string;
 text: string;
 rating: number;
 time_created: string;
 user: User;
};

type User = {
 id: string;
 profile_url: string;
 image_url: string;
 name: string;
};

const fetchReviews = async (id: string): Promise<ReviewResponse> => {
 const { data } = await yelp.get(`/${id}/reviews`);
 return data;
};

const useReview = (id: string) => {
 return useQuery<ReviewResponse, Error>({
  queryKey: ['reviews', id],
  queryFn: async () => {
   return fetchReviews(id);
  },
 });
};

export default useReview;
