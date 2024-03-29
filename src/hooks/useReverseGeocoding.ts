import { useState, useEffect } from "react";

interface GeocodeResult {
  country: string;
  state: string;
}

const useGeocode = (
  latitude?: number,
  longitude?: number,
): {
  data: GeocodeResult | null;
  error: Error | null;
  loading: boolean;
} => {
  const [data, setData] = useState<GeocodeResult | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}`,
        );
        const data = await response.json();
        const result = data.results[0];

        const countryComponent = result.address_components.find(
          (component: any) => component.types.includes("country"),
        );
        const stateComponent = result.address_components.find(
          (component: any) =>
            component.types.includes("administrative_area_level_1"),
        );

        setData({
          country: countryComponent.long_name ?? "",
          state: stateComponent.long_name ?? "",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData().catch((error) => {
      setError(error as Error);
    });
  }, [latitude, longitude]);

  return { data, error, loading };
};

export default useGeocode;
