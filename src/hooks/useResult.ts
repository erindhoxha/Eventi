import yelp from "../api/yelp";
import { useQuery } from "react-query";
import type { Venue } from "../types/types";

const fetchResult = async (id: string): Promise<Venue> => {
  const { data } = await yelp.get(`/${id}`);
  return data;
};

const useResult = (id: string) => {
  return useQuery<Venue, Error>({
    queryKey: ["result", id],
    queryFn: async () => {
      return await fetchResult(id);
    },
  });
};

export default useResult;
