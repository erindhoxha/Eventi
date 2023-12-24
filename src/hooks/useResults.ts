import { useCallback, useState } from 'react';
import yelp from '../api/yelp';

const useResults = () => {
 const [results, setResults] = useState<any>([]);
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState(null);
 const [isRefreshing, setIsRefreshing] = useState(false);

 const request = useCallback(async (term: string) => {
  setLoading(true);
  setIsRefreshing(true);
  try {
   await yelp
    .get('/search', {
     params: {
      limit: 50,
      term,
      location: 'sydney',
     },
    })
    .then((res) => {
     setResults(res.data.businesses);
     setError(null);
    });
  } catch (error) {
   setError(error);
  } finally {
   setLoading(false);
   setIsRefreshing(false);
  }
 }, []);

 return { results, loading, error, request, isRefreshing };
};

export default useResults;
