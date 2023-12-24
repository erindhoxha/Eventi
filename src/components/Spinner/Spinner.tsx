import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { Icon } from 'react-native-magnus';

const Spinner = () => {
 const spinValue = useRef(new Animated.Value(0)).current;

 useEffect(() => {
  Animated.loop(
   Animated.timing(spinValue, {
    toValue: 1,
    duration: 2000,
    easing: Easing.linear,
    useNativeDriver: true,
   })
  ).start();
 }, []);

 const spin = spinValue.interpolate({
  inputRange: [0, 1],
  outputRange: ['0deg', '360deg'],
 });

 return (
  <Animated.View style={{ transform: [{ rotate: spin }] }}>
   <Icon
    name="circle-notch"
    color="gray700"
    fontSize="title"
    fontFamily="FontAwesome5"
   />
  </Animated.View>
 );
};

export default Spinner;
