import React from "react";
import { Image } from "react-native";

function ImageComponent() {
  return (
    <>
    // ini import image dari internet
    <Image
      source={{ uri: 'https://reactjs.org/logo-og.png' }}
      style={{ width: 200, height: 200 }}
    />
    // ini import image di local
    <Image
        source={require('../../../../../src/image/Gemini_Generated_Image_yuqzkpyuqzkpyuqz.png')}
        style={{ width: 200, height: 200 }}
    />
    </>
  );
}

export default ImageComponent