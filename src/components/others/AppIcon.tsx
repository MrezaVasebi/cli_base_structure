import { ColorValue } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useAppConfig } from "../../context";
import { appColors } from "../../utils";

export interface IAppIcon {
  name?: string;
  size?: number | undefined;
  color?: number | ColorValue | undefined;
}

const AppIcon = ({ name, size, color }: IAppIcon) => {
  const { theme } = useAppConfig();

  const defaultSize = size ?? 20;
  const defaultColor =
    color ?? theme === "light" ? appColors.white : appColors.black;

  const handleIcons = () => {
    switch (name) {
      case "language": {
        return <Entypo name={name} color={defaultColor} size={defaultSize} />;
      }
      case "theme-light-dark": {
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
