import React from "react";
import { Image } from "react-native-magnus";

const Logo = () => {
  return (
    <Image
      style={{ width: 200, height: 35 }}
      resizeMode="contain"
      source={require("../../../assets/eventi.png")}
    />
  );
};

export default Logo;
