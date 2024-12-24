import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppText} from '../texts';

interface INoNetwork {
  status: boolean | null;
}

const NoNetwork = (props: INoNetwork) => {
  return (
    <View style={styles.rootStyle}>
      {props.status === null ? (
        <AppText lbl="Loading..." />
      ) : props.status === false ? (
        <AppText lbl="No Internet Connection" />
      ) : null}
    </View>
  );
};

export default NoNetwork;

const styles = StyleSheet.create({
  rootStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
