import { useMutation, useQueryClient } from 'react-query';
import { supabase } from '../../lib/supabase';

// Define the type for your mutation function's argument
type BookmarkMutationArgs = {
  user_id: string;
  restaurant_id: string;
  title?: string;
  image_url?: string;
  reviews?: number;
  rating?: number;
  // Add other fields as needed
};

// Define the mutation function
async function bookmarkMutation({ user_id, restaurant_id, title, image_url, reviews, rating }: BookmarkMutationArgs) {
  // Your existing logic to check and insert a bookmark
  const { data: existingBookmark, error: fetchError } = await supabase
    .from('bookmarks')
    .select('*')
    .eq('user_id', user_id)
    .eq('restaurant_id', restaurant_id);

  if (fetchError) throw new Error('Error fetching bookmark');

  if (existingBookmark && existingBookmark.length > 0) {
    throw new Error('Bookmark already exists');
  }

  const { error: insertError } = await supabase.from('bookmarks').insert({
    user_id,
    restaurant_id,
    title,
    image_url,
    reviews,
    rating,
    // Include other fields as needed
  });

  if (insertError) throw new Error('Error inserting bookmark');

  return; // Return what you need here, for example, the inserted bookmark
}

// Define the type for your remove mutation function's argument
type RemoveBookmarkMutationArgs = {
  user_id: string;
  restaurant_id: string;
};

// Define the remove mutation function
async function removeBookmarkMutation({ user_id, restaurant_id }: RemoveBookmarkMutationArgs) {
  const { error } = await supabase.from('bookmarks').delete().match({ user_id, restaurant_id });

  if (error) throw new Error('Error removing bookmark');

  return; // Optionally return something, like a success message or the ID of the removed bookmark
}

export function useBookmarkMutation({ onSuccess }: { onSuccess?: () => void }) {
  const queryClient = useQueryClient();
  const { mutate, status, isError, error } = useMutation(bookmarkMutation, {
    onSuccess() {
      queryClient.invalidateQueries('userBookmarks');
      queryClient.invalidateQueries('bookmark');

      // Refetch queries to trigger a loading status
      queryClient.refetchQueries('userBookmarks', { active: true });
      queryClient.refetchQueries('bookmark', { active: true });
      onSuccess?.();
    },
  });

  return {
    mutate,
    status,
    isError, // Indicates if the mutation encountered an error
    error, // The error object if an error occurred
  };
}

export function useRemoveBookmarkMutation({ onSuccess }: { onSuccess?: () => void }) {
  const queryClient = useQueryClient();
  const { mutate, status, isError, error } = useMutation(removeBookmarkMutation, {
    onSuccess() {
      queryClient.invalidateQueries('userBookmarks');
      queryClient.invalidateQueries('bookmark');

      // Refetch queries to trigger a loading status
      queryClient.refetchQueries('userBookmarks', { active: true });
      queryClient.refetchQueries('bookmark', { active: true });

      onSuccess?.();
    },
  });

  return {
    mutate,
    status,
    isError, // Indicates if the mutation encountered an error
    error, // The error object if an error occurred
  };
}
