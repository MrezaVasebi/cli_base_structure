import { ColorValue } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useAppConfig } from "../../context";
import { appColors, iconsName } from "../../utils";

export interface IAppIcon {
  name?: string;
  size?: number | undefined;
  color?: number | ColorValue | undefined;
}

const AppIcon = ({ name, size, color }: IAppIcon) => {
  const { theme } = useAppConfig();

  const defaultSize = size ?? 20;
  const defaultColor = color
    ? color
    : theme === "light"
    ? appColors.bg.dark
    : appColors.bg.light;

  const handleIcons = () => {
    switch (name) {
      case iconsName.exit: {
        return <Ionicons name={name} color={defaultColor} size={defaultSize} />;
      }
      case iconsName.search: {
        return <Ionicons name={name} color={defaultColor} size={defaultSize} />;
      }
      case iconsName.heart: {
        return (
          <AntDesign name={name} color={defaultColor} size={defaultSize} />
        );
      }
      case iconsName["eye-with-line"]: {
        return <Entypo name={name} color={defaultColor} size={defaultSize} />;
      }
      case iconsName.eye: {
        return <Entypo name={name} color={defaultColor} size={defaultSize} />;
      }
      case iconsName.language: {
        return <Entypo name={name} color={defaultColor} size={defaultSize} />;
      }
      case iconsName.close: {
        return <Ionicons name={name} color={defaultColor} size={defaultSize} />;
      }
      case iconsName.arrowleft: {
        return (
          <AntDesign name={name} color={defaultColor} size={defaultSize} />
        );
      }
      case iconsName.arrowright: {
        return (
          <AntDesign name={name} color={defaultColor} size={defaultSize} />
        );
      }
      case iconsName["theme-light-dark"]: {
        return (
          <MaterialCommunityIcons
            name={name}
            color={defaultColor}
            size={defaultSize}
          />
        );
      }
      default:
        return null;
    }
  };

  return handleIcons();
};

export default AppIcon;
