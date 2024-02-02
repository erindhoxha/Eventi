import { supabase } from "../../lib/supabase";

const useBookmarkMutation = async ({
  user_id,
  restaurant_id,
}: {
  user_id: string;
  restaurant_id: string;
}) => {
  // Check if the bookmark already exists
  const { data: existingBookmark, error: fetchError } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("user_id", user_id)
    .eq("restaurant_id", restaurant_id);

  if (fetchError) {
    console.log(fetchError);
    throw new Error("Error fetching bookmark");
  }

  if (existingBookmark && existingBookmark.length > 0) {
    console.log("Bookmark already exists");
    return;
  }

  const { error: insertError } = await supabase
    .from("bookmarks")
    .insert({ user_id, restaurant_id });

  if (insertError) {
    console.log(insertError);
    throw new Error("Error inserting bookmark");
  }
};

export default useBookmarkMutation;
