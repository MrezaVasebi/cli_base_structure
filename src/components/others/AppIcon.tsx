import { ColorValue } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useAppConfig } from "../../context";
import { appColors, icons } from "../../utils";

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
      case icons.exit: {
        return <Ionicons name={name} color={defaultColor} size={defaultSize} />;
      }
      case icons.search: {
        return <Ionicons name={name} color={defaultColor} size={defaultSize} />;
      }
      case icons.heart: {
        return (
          <AntDesign name={name} color={defaultColor} size={defaultSize} />
        );
      }
      case icons["eye-with-line"]: {
        return <Entypo name={name} color={defaultColor} size={defaultSize} />;
      }
      case icons.eye: {
        return <Entypo name={name} color={defaultColor} size={defaultSize} />;
      }
      case icons.language: {
        return <Entypo name={name} color={defaultColor} size={defaultSize} />;
      }
      case icons.close: {
        return <Ionicons name={name} color={defaultColor} size={defaultSize} />;
      }
      case icons.arrowleft: {
        return (
          <AntDesign name={name} color={defaultColor} size={defaultSize} />
        );
      }
      case icons.arrowright: {
        return (
          <AntDesign name={name} color={defaultColor} size={defaultSize} />
        );
      }
      case icons["theme-light-dark"]: {
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
