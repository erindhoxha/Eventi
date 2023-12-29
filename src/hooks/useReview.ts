import { useCallback, useState } from 'react';
import yelp from '../api/yelp';

const useReview = (id: string) => {
 const [result, setResult] = useState();
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
