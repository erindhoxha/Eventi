import { useCallback, useState } from 'react';
import yelp from '../api/yelp';
import { useQuery } from 'react-query';
import { Venue } from '../types/types';

const fetchResults = async (
 term: string,
 location: string
): Promise<{
 total: number;
 businesses: Venue[];
}> => {
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
 return useQuery<
  {
   total: number;
   businesses: Venue[];
  },
  Error
 >({
  queryKey: ['results', term, location],
  queryFn: async () => {
   return fetchResults(term, location);
  },
  enabled: !!term && !!location,
 });
};

export default useResults;
