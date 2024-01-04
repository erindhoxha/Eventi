import { useEffect, useState } from "react";
import * as Location from "expo-location";

interface UseLocationPropTypes {
  location: Location.LocationObject | null;
  error: string | null;
  loading: boolean;
}

const useLocation = (): UseLocationPropTypes => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    void (async () => {
      setLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setLoading(false);
    })();
  }, []);

  return {
    location,
    error,
    loading,
  };
};

export default useLocation;
