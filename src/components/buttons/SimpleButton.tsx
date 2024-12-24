import {StyleSheet, TouchableOpacityProps} from 'react-native';

import React from 'react';
import {appColors} from '../../utils';
import {AppText} from '../texts';
import ButtonWrapper from './ButtonWrapper';

interface ISimpleButton {
  lbl?: string;
  lblStyle?: object;
}

const SimpleButton = (props: TouchableOpacityProps & ISimpleButton) => {
  return (
    <ButtonWrapper
      disabled={props.disabled}
      onPress={props.onPress}
      style={[styles.btnStyle, props.style]}>
      <AppText
        lbl={props.lbl ?? ''}
        style={[styles.lblStyle, props.lblStyle]}
      />
    </ButtonWrapper>
  );
};

export default SimpleButton;

const styles = StyleSheet.create({
  btnStyle: {
    height: 45,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: appColors.blue,
  },
  lblStyle: {
    color: appColors.white,
  },
});
