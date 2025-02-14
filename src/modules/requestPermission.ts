import { PermissionsAndroid } from "react-native";

export const requestMultiplePermissions = async () => {
  try {
    const permissions = [
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    ];

    const granted = await PermissionsAndroid.requestMultiple(permissions);
  } catch (err) {
    console.warn(err);
  }
};
