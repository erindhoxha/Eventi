import { useCallback, useState } from 'react';
import yelp from '../api/yelp';
import { useQuery } from 'react-query';

const fetchResults = async (term: string, location: string): Promise<[]> => {
 const { data } = await yelp.get('/search', {
  params: {
   limit: 50,
   term,
   location,
  },
 });
 return data;
};

const useResults = (term: string, location: string) => {
 return useQuery<any[], Error>({
  queryKey: ['results', term, location],
  queryFn: async () => {
   return fetchResults(term, location);
  },
  enabled: !!term && !!location,
 });
};

export default useResults;
