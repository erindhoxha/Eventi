import yelp from "../api/yelp";
import { useQuery } from "react-query";

interface ReviewResponse {
  reviews: Review[];
  total: number;
  possible_languages: string[];
}

interface Review {
  id: string;
  url: string;
  text: string;
  rating: number;
  time_created: string;
  user: User;
}

interface User {
  id: string;
  profile_url: string;
  image_url: string;
  name: string;
}

const fetchReviews = async (id: string): Promise<ReviewResponse> => {
  const { data } = await yelp.get(`/${id}/reviews`);
  return data;
};

const useReview = (id: string) => {
  return useQuery<ReviewResponse, Error>({
    queryKey: ["reviews", id],
    queryFn: async () => {
      return await fetchReviews(id);
    },
  });
};

export default useReview;
