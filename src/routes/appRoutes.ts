import { NativeStackScreenProps } from "@react-navigation/native-stack";

export const ROUTES = {
  Splash: "Splash",
  Content: "Content",
} as const;

export type RouteName = keyof typeof ROUTES;

export type RootStackParams = {
  [ROUTES.Splash]: undefined;
  [ROUTES.Content]: {
    title: string;
  };
};

export type SplashProps = NativeStackScreenProps<RootStackParams, "Splash">;
export type ContentProps = NativeStackScreenProps<RootStackParams, "Content">;
