import React from "react";
import { useTranslation } from "react-i18next";
import {
  Animated,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacityProps,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import { useAppConfig } from "../../context/AppConfigContext.tsx";
import { appColors, globalUi } from "../../utils";
import AnimatedRootModal from "../modals/AnimatedRootModal.tsx";
import AppText from "../texts/AppText";
import ButtonWrapper from "./ButtonWrapper";
import IconButton from "./IconButton.tsx";

interface ISingleSelectButtonModal<D> {
  label?: string;
  placeholder?: string;
  selectedLabel?: string;
  modalData?: ArrayLike<D>;
  lblStyle?: StyleProp<TextStyle>;
  innerStyle?: StyleProp<ViewStyle>;

  onDeleteValue?: () => void;
  onPressShowModal: () => void;
  onPressCloseModal: () => void;

  showModal: boolean;
  modalTitle?: string;
  showCloseBtnModal?: boolean;
  modalAnimation: Animated.Value;
  renderItem: React.ComponentType<any> | null | undefined;
}

const SingleSelectButtonModal = <D,>(
  props: ISingleSelectButtonModal<D> & TouchableOpacityProps & ViewProps
) => {
  const { i18n } = useTranslation();
  const { theme } = useAppConfig();

  return (
    <View style={[styles.rootStyle, props.style]}>
      <AppText lbl={props.label} style={[styles.lblStyle, props.lblStyle]} />

      <View
        style={[
          styles.innerStyle,
          {
            backgroundColor:
              theme === "light" ? appColors.white : appColors.white,
            ...globalUi.shadowStyle,
          },
          props.innerStyle,
        ]}
      >
        <ButtonWrapper
          style={[
            styles.showModalStyle,
            { backgroundColor: appColors.transparent },
          ]}
          onPress={props.onPressShowModal}
        >
          <AppText
            lbl={props.selectedLabel}
            color={
              props.selectedLabel === props.placeholder
                ? appColors.darkGrey
                : appColors.black
            }
          />
        </ButtonWrapper>

        {props.selectedLabel !== props.placeholder ? (
          <IconButton
            iconSize={20}
            iconName="close"
            style={{
              ...styles.deleteBtnStyle,
              ...(i18n.language === "fa" ? { right: 5 } : { left: 5 }),
            }}
            onPress={props.onDeleteValue}
            iconColor={appColors.black}
          />
        ) : null}
      </View>

      <AnimatedRootModal
        title={props.modalTitle}
        visible={props.showModal}
        animation={props.modalAnimation}
        closeModal={props.onPressCloseModal}
        showCloseBtn={props.showCloseBtnModal}
      >
        {props.children}
      </AnimatedRootModal>
    </View>
  );
};

export default SingleSelectButtonModal;

const styles = StyleSheet.create({
  rootStyle: {},
  lblStyle: {},
  innerStyle: {
    height: 45,
    marginTop: 5,
    borderRadius: 5,
    overflow: "hidden",
    paddingHorizontal: 7,
    flexDirection: "row",
  },
  showModalStyle: {
    flex: 1,
    paddingLeft: 5,
    justifyContent: "center",
  },
  iconStyle: {
    width: 30,
    marginLeft: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  btnStyle: {
    height: 40,
    borderBottomWidth: 1,
    justifyContent: "center",
  },
  inputStyle: {
    borderWidth: 0,
    borderRadius: 0,
    borderBottomWidth: 1,
  },
  deleteBtnStyle: {
    top: 8,
    right: 0,
    position: "absolute",
  },
});
