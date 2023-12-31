import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

type Coords = {
 accuracy: number;
 altitude: number;
 altitudeAccuracy: number;
 heading: number;
 latitude: number;
 longitude: number;
 speed: number;
};

type Location = {
 coords: Coords;
 timestamp: number;
};

interface UseLocationPropTypes {
 location: Location | null;
 error: Error | null;
 loading: boolean;
}

const useLocation = (): UseLocationPropTypes => {
 const [location, setLocation] = useState(null);
 const [error, setError] = useState(null);
 const [loading, setLoading] = useState(false);

 useEffect(() => {
  (async () => {
   setLoading(true);
   let { status } = await Location.requestForegroundPermissionsAsync();
   if (status !== 'granted') {
    setError('Permission to access location was denied');
    return;
   }

   let location = await Location.getCurrentPositionAsync({});
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
