import React, {Fragment} from 'react';

import {SafeAreaView} from 'react-native-safe-area-context';
import {appColors} from '../../utils';
import BodyView from './BodyView';

interface IRootView {
  bodyStyle?: {};
  topBgColor?: string;
  bodyBgColor?: string;
  children: React.ReactNode;
}

const RootView = (props: IRootView) => {
  return (
    <Fragment>
      <SafeAreaView
        style={{flex: 0, backgroundColor: props.topBgColor ?? appColors.white}}
      />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: props.bodyBgColor ?? appColors.white,
        }}>
        <BodyView style={props.bodyStyle}>{props.children}</BodyView>
      </SafeAreaView>
    </Fragment>
  );
};

export default RootView;
