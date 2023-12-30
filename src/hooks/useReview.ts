import { useCallback, useState } from 'react';
import yelp from '../api/yelp';

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

const useReview = () => {
 const [result, setResult] = useState<ReviewResponse>();
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState(null);
 const [isRefreshing, setIsRefreshing] = useState(false);

 const request = useCallback(async (id: string) => {
  setLoading(true);
  setIsRefreshing(true);
  try {
   await yelp.get(`/${id}/reviews`).then((res) => {
    console.log('Getting', res);
    setResult(res.data);
    setError(null);
   });
  } catch (error) {
   console.log('Error', error);
   setError(error);
  } finally {
   setLoading(false);
   setIsRefreshing(false);
  }
 }, []);

 return { result, loading, error, request, isRefreshing };
};

export default useReview;
