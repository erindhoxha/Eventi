import yelp from "../api/yelp";
import { useQuery } from "react-query";
import type { Venue } from "../types/types";

const fetchResults = async (
  term: string,
  location: string,
): Promise<{
  total: number;
  businesses: Venue[];
}> => {
  const { data } = await yelp.get("/search", {
    params: {
      limit: 50,
      term,
      location,
    },
  });
  return data;
};

const useResults = (term?: string, location?: string) => {
  return useQuery<
    {
      total: number;
      businesses: Venue[];
    },
    Error
  >({
    queryKey: ["results", term, location],
    queryFn: async () => {
      if (term == null || location == null) {
        throw new Error("term and location must be provided");
      }
      return await fetchResults(term, location);
    },
    enabled: !(term == null) && !(location == null),
  });
};

export default useResults;
