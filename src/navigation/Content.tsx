import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  AnimatedCheckBox,
  AppLoadingButton,
  IconButton,
  IconButtonWithLabel,
  LineTabButton,
  SingleSelectButtonModal,
  SingleSelectItem,
  SwitchButton,
  TabButton,
} from "../components/buttons";

import { useTranslation } from "react-i18next";
import AnimatedRadioButton from "../components/buttons/AnimatedRadioButton";
import ThreeTabButton from "../components/buttons/ThreeTabButtons";
import { RootView } from "../components/others";
import { AppText } from "../components/texts";
import { useOpenCloseModal } from "../hooks";
import { ContentProps } from "../routes";

// import {RouteProp} from '@react-navigation/native';
// import {StackNavigationProp} from '@react-navigation/stack';

// type TestingProp = StackNavigationProp<RootStackParams, 'Testing'>;
// type TestingRouteProp = RouteProp<RootStackParams, 'Testing'>;

interface IModalData {
  name: string;
  label: string;
  isSelected: boolean;
}

const Content = (props: ContentProps) => {
  // const navigation: NavigationProp<ParamListBase> =
  //   useNavigation<TestingProp>();

  // const {title} = useRoute<TestingRouteProp>().params;

  const { i18n } = useTranslation();
  const language = i18n.language;

  const [check, setCheck] = useState<boolean>(false);
  const [loadingBtn, setLoadingBtn] = useState<boolean>(false);

  const [tabName, setTabName] = useState<"left" | "right">("left");
  const [threeTabName, setThreeTabName] = useState<"left" | "right" | "center">(
    "left"
  );

  const { openModal, closeModal, modalAnimation } = useOpenCloseModal();
  const [itemModal, setItemModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string>("chooseAnItem");
  const [modalData, setModalData] = useState<Array<IModalData>>([
    { name: "tabriz", label: "Tabriz", isSelected: false },
    { name: "tehran", label: "Tehran", isSelected: false },
    { name: "Shiraz", label: "Shiraz", isSelected: false },
  ]);

  return (
    <RootView bodyStyle={styles.rootStyle}>
      <View
        style={{
          ...styles.titleContainer,
          flexDirection: language === "fa" ? "row-reverse" : "row",
        }}
      >
        <IconButton
          iconSize={25}
          style={{
            ...(language === "fa" ? { marginLeft: 10 } : { marginRight: 10 }),
          }}
          onPress={() => props.navigation.goBack()}
          iconName={i18n.language === "fa" ? "arrowright" : "arrowleft"}
        />
        <AppText lbl={props.route.params.title} style={{ fontSize: 20 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollStyle}
      >
        <AppText lbl="buttons" style={{ fontSize: 22 }} />
        <View style={{ paddingVertical: 20 }}>
          <AnimatedCheckBox
            isChecked={check}
            lbl="Animated CheckBox"
            onPress={() => setCheck(!check)}
          />

          <AnimatedRadioButton
            isSelected={check}
            lbl="Animated Radio Button"
            style={{ marginTop: 10 }}
            onPress={() => setCheck(!check)}
          />

          <AppLoadingButton
            loading={loadingBtn}
            label="Loading Button"
            style={{ marginTop: 10 }}
            onPress={() => {
              setLoadingBtn(true);

              setTimeout(() => {
                setLoadingBtn(false);
              }, 2000);
            }}
          />

          <IconButton style={{ marginTop: 10 }} iconName="language" />

          <IconButtonWithLabel
            style={{ marginTop: 10 }}
            iconName="language"
            label="Language"
          />

          <LineTabButton
            lblLeft="left"
            lblRight="right"
            tabName={tabName}
            onPressLeft={() => {
              setTabName("left");
            }}
            onPressRight={() => {
              setTabName("right");
            }}
            style={{ marginTop: 10 }}
          />

          <TabButton
            lblLeft="left"
            lblRight="right"
            tabName={tabName}
            onPressLeft={() => {
              setTabName("left");
            }}
            onPressRight={() => {
              setTabName("right");
            }}
            style={{ marginTop: 20 }}
          />

          <ThreeTabButton
            lblLeft="left"
            lblRight="right"
            lblCenter="center"
            tabName={threeTabName}
            onPressLeft={() => {
              setThreeTabName("left");
            }}
            onPressRight={() => {
              setThreeTabName("right");
            }}
            onPressCenter={() => {
              setThreeTabName("center");
            }}
            style={{ marginTop: 20 }}
          />

          <SwitchButton
            isSelected={check}
            style={{ marginTop: 10 }}
            onPress={() => setCheck(!check)}
          />

          <SingleSelectButtonModal
            showModal={itemModal}
            label={"chooseAnItem"}
            showCloseBtnModal={true}
            style={{ marginTop: 10 }}
            modalTitle={"chooseAnItem"}
            modalAnimation={modalAnimation}
            onPressShowModal={() => {
              openModal(() => setItemModal(true));
            }}
            onPressCloseModal={() => {
              closeModal(() => setItemModal(false));
            }}
            placeholder="chooseAnItem"
            selectedLabel={selectedItem}
            onDeleteValue={() => setSelectedItem("chooseAnItem")}
            renderItem={() => null}
          >
            <View style={{ padding: 20 }}>
              {modalData.map((el, index) => {
                return (
                  <SingleSelectItem
                    key={index}
                    lbl={el.label}
                    isSelected={el.isSelected}
                    onPress={() => {
                      setModalData((pre) =>
                        pre.map((ele) => {
                          return ele === el
                            ? { ...ele, isSelected: true }
                            : { ...ele, isSelected: false };
                        })
                      );
                      setSelectedItem(el.label);
                      closeModal(() => setItemModal(false));
                    }}
                  />
                );
              })}
            </View>
          </SingleSelectButtonModal>
        </View>
      </ScrollView>
    </RootView>
  );
};

export default Content;

const styles = StyleSheet.create({
  rootStyle: {
    paddingVertical: 20,
  },
  titleContainer: {
    marginBottom: 20,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  scrollStyle: {
    flexGrow: 1,
    padding: 20,
  },
});
