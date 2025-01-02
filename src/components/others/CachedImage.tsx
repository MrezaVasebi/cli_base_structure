import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import FastImage from "react-native-fast-image";

interface ICachedImage {
  uri?: string;
}

const CachedImage = (props: ViewProps & ICachedImage) => {
  return (
    <View style={[styles.rootStyle, props.style]}>
      <FastImage
        style={styles.imgStyle}
        source={{
          uri: props.uri,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
    </View>
  );
};

export default CachedImage;

const styles = StyleSheet.create({
  rootStyle: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  imgStyle: {
    width: "100%",
    height: "100%",
  },
});
