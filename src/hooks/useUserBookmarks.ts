import { useQuery } from "react-query";
import { supabase } from "../../lib/supabase";

const fetchBookmarks = async (user_id: string) => {
  const { data, error } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("user_id", user_id);

  if (error) {
    throw error;
  }

  return data;
};

const useUserBookmarks = (user_id) => {
  const {
    data: bookmarks,
    isLoading: loading,
    error,
  } = useQuery(["userBookmarks", user_id], () => fetchBookmarks(user_id));

  return { bookmarks, loading, error };
};

export default useUserBookmarks;
