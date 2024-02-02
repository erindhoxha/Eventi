import { supabase } from "../../lib/supabase";

const useRemoveBookmarkMutation = async ({
  user_id,
  restaurant_id,
}: {
  user_id: string;
  restaurant_id: string;
}) => {
  const { error } = await supabase
    .from("bookmarks")
    .delete()
    .eq("user_id", user_id)
    .eq("restaurant_id", restaurant_id);

  if (error) {
    console.log(error);
    throw new Error("Error removing bookmark");
  }
};

export default useRemoveBookmarkMutation;
