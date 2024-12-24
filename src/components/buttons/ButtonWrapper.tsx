import {TouchableOpacity, TouchableOpacityProps} from 'react-native';

import React from 'react';

const ButtonWrapper = (props: TouchableOpacityProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={props.style}
      onPress={props.onPress}
      disabled={props.disabled}>
      {props.children}
    </TouchableOpacity>
  );
};

export default ButtonWrapper;
