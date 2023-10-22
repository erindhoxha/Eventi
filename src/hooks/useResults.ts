import { useCallback, useState } from 'react';
import yelp from '../api/yelp';

const useResults = () => {
  const [results, setResults] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (term: string) => {
    setLoading(true);
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
        });
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { results, loading, error, request };
};

export default useResults;
