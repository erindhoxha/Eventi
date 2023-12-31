import { useState, useEffect } from 'react';

type GeocodeResult = {
 country: string;
 state: string;
};

// Mock API call
const mockApiCall = () => {
 return new Promise((resolve) => {
  setTimeout(() => {
   resolve({
    address_components: [
     {
      long_name: 'United States',
      short_name: 'US',
      types: ['country', 'political'],
     },
     {
      long_name: 'California',
      short_name: 'CA',
      types: ['administrative_area_level_1', 'political'],
     },
    ],
   });
  });
 });
};

const useMockGeocode = (latitude: number, longitude: number) => {
 const [data, setData] = useState<GeocodeResult | null>(null);
 const [error, setError] = useState<Error | null>(null);
 const [loading, setLoading] = useState(false);

 useEffect(() => {
  const fetchData = async () => {
   setLoading(true);
   try {
    const result = await mockApiCall(); // Use the mock function

    const countryComponent = result.address_components.find((component: any) =>
     component.types.includes('country')
    );
    const stateComponent = result.address_components.find((component: any) =>
     component.types.includes('administrative_area_level_1')
    );

    setData({
     country: countryComponent ? countryComponent.long_name : '',
     state: stateComponent ? stateComponent.long_name : '',
    });
   } catch (error) {
    setError(error);
   } finally {
    setLoading(false);
   }
  };

  fetchData();
 }, [latitude, longitude]);

 return { data, error, loading };
};

export default useMockGeocode;
