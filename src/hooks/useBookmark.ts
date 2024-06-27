import { useQuery } from 'react-query';
import { supabase } from '../../lib/supabase';

const fetchBookmark = async (
  user_id: string,
  restaurant_id: string,
) => {
  const { data, error } = await supabase
    .from('bookmarks')
    .select('*')
    .eq('user_id', user_id)
    .eq('restaurant_id', restaurant_id)
    .single(); // Use .single() to return only one record

  if (data) {
    return data;
  } else {
    throw new Error('Bookmark not found');
  }
};

const useBookmark = (
  user_id: string,
  restaurant_id: string,
) => {
  return useQuery(
    ['bookmark', user_id, restaurant_id],
    () => fetchBookmark(user_id, restaurant_id),
  );
};

export default useBookmark;
