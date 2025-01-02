import React, { useState } from "react";
import {
  Image,
  StyleProp,
  StyleSheet,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { appImages, DEV_MODE } from "../../utils";
import { ButtonWrapper } from "../buttons";
import { AppText } from "../texts";

interface IAppAvatar {
  name?: string;
  rootStyle?: StyleProp<ViewStyle>;
  returnUriAndFileName: ({
    uri,
    fileName,
  }: {
    uri: string;
    fileName: string;
  }) => void;
}

const AppAvatar = (props: IAppAvatar & TouchableOpacityProps) => {
  const [uri, setUri] = useState<string>("");

  const onChooseImageAsync = async () => {
    await launchImageLibrary({
      mediaType: "photo",
      quality: 1,
    })
      .then((res) => {
        if (res.didCancel || res.errorMessage) return;
        if (res && res.assets && res.assets?.length !== 0) {
          const { uri, fileName } = res.assets[0];
          if (res.assets[0] && uri && fileName) {
            setUri(uri);
            props.returnUriAndFileName({ uri, fileName });
          }
        }
      })
      .catch((err) => {
        if (DEV_MODE)
          console.log(
            "error in choosing image from galley",
            JSON.stringify(err, null, 2)
          );
      });
  };

  return (
    <View style={[styles.rootStyle, props.rootStyle]}>
      <ButtonWrapper
        onPress={onChooseImageAsync}
        style={styles.avatarContainer}
      >
        {uri ? (
          <Image source={{ uri: uri }} style={styles.imgStyle} />
        ) : (
          <Image source={appImages.avatar} style={styles.imgStyle} />
        )}
      </ButtonWrapper>

      <AppText lbl={props.name ?? ""} style={{ marginVertical: 10 }} />
    </View>
  );
};

export default AppAvatar;

const styles = StyleSheet.create({
  rootStyle: {
    paddingTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  imgStyle: {
    width: "100%",
    height: "100%",
  },
});
