import {StyleSheet, View, ViewProps} from 'react-native';

import React from 'react';

const BodyView = (props: ViewProps) => {
  return <View style={[styles.rootStyle, props.style]}>{props.children}</View>;
};

export default BodyView;

const styles = StyleSheet.create({
  rootStyle: {
    flex: 1,
  },
});
