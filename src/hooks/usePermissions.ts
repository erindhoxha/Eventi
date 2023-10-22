import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

const [location, setLocation] = useState(null);
const [errorMsg, setErrorMsg] = useState(null);

const usePermissions = () => {
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  if (errorMsg) {
    console.log(errorMsg);
  } else if (location) {
    console.log(JSON.stringify(location));
  }
};

export default usePermissions;
