import { PermissionsAndroid, Platform } from "react-native";

export const requestMultiplePermissions = async (): Promise<void> => {
  try {
    // Convert Platform.Version to a number if needed
    const androidVersion =
      typeof Platform.Version === "string"
        ? parseInt(Platform.Version, 10)
        : Platform.Version;

    const permissions: PermissionsAndroid.Permission[] =
      androidVersion >= 33 // Android 13 and above
        ? [
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          ]
        : [
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, // Optional for < Android 13
          ];

    // Request multiple permissions
    const granted = await PermissionsAndroid.requestMultiple(permissions);

    // Log results for debugging
    const results = Object.keys(granted).map((key) => ({
      permission: key,
      status: granted[key],
    }));

    console.log("Permission Results:", results);

    // Check if all permissions are granted
    const allGranted: boolean = results.every(
      (result) => result.status === PermissionsAndroid.RESULTS.GRANTED
    );

    if (allGranted) {
      console.log("All permissions granted!");
    } else {
      console.log("Some permissions were denied.");
    }
  } catch (err) {
    console.warn("Error requesting permissions:", err);
  }
};
