import React from "react";
import { ImageBackground } from 'react-native';


type BackGroundProps = {
    children: React.ReactNode
};

function ImageBackgroundExample({children} : BackGroundProps) {
  return (
    <ImageBackground
      source={{ uri: 'https://reactjs.org/logo-og.png' }}
      resizeMode="cover"
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
        {children}
    </ImageBackground>
  );
}

export default ImageBackgroundExample