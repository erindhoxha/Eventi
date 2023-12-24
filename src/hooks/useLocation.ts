import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

const useLocation = () => {
 const [location, setLocation] = useState(null);
 const [error, setError] = useState(null);

 useEffect(() => {
  (async () => {
   let { status } = await Location.requestForegroundPermissionsAsync();
   if (status !== 'granted') {
    setError('Permission to access location was denied');
    return;
   }

   let location = await Location.getCurrentPositionAsync({});
   setLocation(location);
  })();
 }, []);

 return {
  location,
  error,
 };
};

export default useLocation;
