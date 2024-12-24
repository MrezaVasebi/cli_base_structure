import React from "react";
import { StyleSheet } from "react-native";
import { RootView } from "../components/others";
import { AppText } from "../components/texts";
import { ContentProps } from "../routes";

// import {RouteProp} from '@react-navigation/native';
// import {StackNavigationProp} from '@react-navigation/stack';

// type TestingProp = StackNavigationProp<RootStackParams, 'Testing'>;
// type TestingRouteProp = RouteProp<RootStackParams, 'Testing'>;

const Content = (props: ContentProps) => {
  // const navigation: NavigationProp<ParamListBase> =
  //   useNavigation<TestingProp>();

  // const {title} = useRoute<TestingRouteProp>().params;

  return (
    <RootView>
      <AppText lbl={props.route.params.title} />
    </RootView>
  );
};

export default Content;

const styles = StyleSheet.create({});
