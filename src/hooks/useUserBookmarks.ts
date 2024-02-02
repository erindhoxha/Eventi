import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

const useUserBookmarks = (user_id) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const { data, error } = await supabase
          .from("bookmarks")
          .select("*")
          .eq("user_id", user_id);

        if (error) {
          throw error;
        }

        setBookmarks(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [user_id]);

  return { bookmarks, loading, error };
};

export default useUserBookmarks;
