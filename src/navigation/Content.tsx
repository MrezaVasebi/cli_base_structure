import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  AnimatedCheckBox,
  AnimatedRadioButton,
  AppLoadingButton,
  IconButton,
  IconButtonWithLabel,
  LineTabButton,
  SimpleButton,
  SingleSelectButtonModal,
  SingleSelectItem,
  SwitchButton,
  TabButton,
  TextButton,
  ThreeTabButtons,
} from "../components/buttons";

import { useTranslation } from "react-i18next";
import { Platform } from "react-native";
import {
  CreditCardInput,
  IbanInput,
  InputPhoneNumber,
  InputWithClearButton,
  InputWithLabel,
  PinInput,
  PriceInput,
  SearchInput,
  SecureInput,
  SimpleInput,
} from "../components/inputs";
import { AppAvatar, AppDivider, RootView } from "../components/others";
import TimerCountDown from "../components/others/TimerCountDown";
import { AppText } from "../components/texts";
import { useAppConfig } from "../context";
import { useOpenCloseModal, useTimerCountDown } from "../hooks";
import { exitApplication, storage } from "../modules";
import { ContentProps } from "../routes";
import { appColors, icons, STORAGE_KEY } from "../utils";

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

  const { theme, setTheme, showToast } = useAppConfig();

  const { i18n } = useTranslation();
  const isFaLanguage = i18n.language === "fa";

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

  const [showInputs, setShowInputs] = useState<boolean>(false);
  const [showButtons, setShowButtons] = useState<boolean>(false);
  const [showOthers, setShowOthers] = useState<boolean>(false);

  const [enteredValue, setEnteredValue] = useState<string>("");
  const [secureText, setSecureText] = useState<boolean>(true);

  const timer = 60;
  const { onStartAgain, secondsLeft } = useTimerCountDown({
    timer,
    validationValue: true,
  });

  return (
    <RootView bodyStyle={styles.rootStyle}>
      <View
        style={{
          ...styles.titleContainer,
          flexDirection: isFaLanguage ? "row" : "row-reverse",
        }}
      >
        <IconButton
          style={{
            ...styles.langStyle,
            ...(isFaLanguage
              ? { transform: [{ rotate: "180deg" }] }
              : { transform: [{ rotate: "0deg" }] }),
            ...(isFaLanguage ? { right: 20 } : { left: 20 }),
          }}
          iconSize={28}
          onPress={exitApplication}
          iconName={icons["exit"]}
        />

        <IconButton
          style={[
            styles.langStyle,
            { ...(isFaLanguage ? { right: 70 } : { left: 70 }) },
          ]}
          onPress={async () => {
            await i18n.changeLanguage(isFaLanguage ? "en" : "fa");
            await storage(STORAGE_KEY.lang_key).storeData(
              isFaLanguage ? "en" : "fa"
            );
          }}
          iconName={icons.language}
          iconSize={25}
        />

        <IconButton
          style={{
            ...styles.langStyle,
            ...(isFaLanguage ? { right: 120 } : { left: 120 }),
          }}
          onPress={async () => {
            setTheme(theme === "light" ? "dark" : "light");
            await storage(STORAGE_KEY.theme_key).storeData(
              theme === "light" ? "dark" : "light"
            );
          }}
          iconName={icons["theme-light-dark"]}
          iconSize={25}
        />

        {/* <IconButton
          iconSize={25}
          style={{
            ...(language  ? { marginLeft: 10 } : { marginRight: 10 }),
          }}
          onPress={() => props.navigation.goBack()}
          iconName={i18n.language  ? "arrowright" : "arrowleft"}
        /> */}
        <AppText lbl={props.route.params.title} style={{ fontSize: 20 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollStyle}
      >
        <TextButton
          lbl="buttons"
          lblStyle={{
            ...styles.itemButton,
            borderColor:
              theme === "light" ? appColors.bg.dark : appColors.bg.light,
          }}
          onPress={() => setShowButtons(!showButtons)}
          style={{ marginBottom: showButtons ? 0 : 20 }}
        />

        {showButtons && (
          <View
            style={{
              paddingVertical: 20,
              alignItems: i18n.language === "en" ? "flex-end" : "flex-start",
            }}
          >
            <AnimatedCheckBox
              isChecked={check}
              lbl="Animated CheckBox"
              onPress={() => setCheck(!check)}
            />

            <AnimatedRadioButton
              isSelected={check}
              lbl="Animated Radio Button"
              style={{ marginTop: 20 }}
              onPress={() => setCheck(!check)}
            />

            <AppLoadingButton
              loading={loadingBtn}
              label="Loading Button"
              style={{ marginTop: 20 }}
              onPress={() => {
                setLoadingBtn(true);

                setTimeout(() => {
                  setLoadingBtn(false);
                }, 2000);
              }}
            />

            <View style={{ marginTop: 20, flexDirection: "row" }}>
              <IconButton iconSize={30} iconName={icons.language} />

              <IconButton
                iconSize={30}
                style={{ marginLeft: 20 }}
                iconName={icons.heart}
              />
            </View>

            <IconButtonWithLabel
              hasBgColor
              iconSize={25}
              label="language"
              style={{ marginTop: 20 }}
              lblStyle={{ fontSize: 15 }}
              iconName={icons.language}
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
              style={{ marginTop: 20 }}
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

            <View style={styles.textBtnContainer}>
              <TextButton onPress={() => {}} lbl={"createAccount"} />
            </View>

            <SwitchButton
              isSelected={check}
              style={{ marginTop: 20 }}
              onPress={() => setCheck(!check)}
            />

            <ThreeTabButtons
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

            <SingleSelectButtonModal
              showModal={itemModal}
              label={"chooseAnItem"}
              showCloseBtnModal={true}
              modalTitle={"chooseAnItem"}
              modalAnimation={modalAnimation}
              style={{ marginTop: 20, width: "100%" }}
              onPressShowModal={() => {
                openModal(() => setItemModal(true));
              }}
              onPressCloseModal={() => {
                closeModal(() => setItemModal(false));
              }}
              placeholder="chooseAnItem"
              selectedLabel={selectedItem}
              onDeleteValue={() => {
                setSelectedItem("chooseAnItem");

                setModalData(
                  modalData.map((el) => {
                    return { ...el, isSelected: false };
                  })
                );
              }}
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
        )}

        <TextButton
          lbl="inputs"
          lblStyle={{
            ...styles.itemButton,
            borderColor:
              theme === "light" ? appColors.bg.dark : appColors.bg.light,
          }}
          onPress={() => setShowInputs(!showInputs)}
          style={{ marginBottom: showInputs ? 0 : 20 }}
        />
        {showInputs ? (
          <View style={{ paddingVertical: 20 }}>
            <SimpleInput
              value={enteredValue}
              style={{ marginBottom: 20 }}
              onChangeText={(v: string) => setEnteredValue(v)}
            />

            <SecureInput
              visible
              lbl="pass"
              isRequired={true}
              value={enteredValue}
              secureTextEntry={secureText}
              rootStyle={{ marginBottom: 20 }}
              onPressEye={() => setSecureText(!secureText)}
              onChangeText={(v: string) => setEnteredValue(v)}
            />

            <View style={{ marginBottom: 20, paddingHorizontal: 50 }}>
              <PinInput
                length={4}
                onComplete={(value: string) => {
                  console.log({ value });
                }}
              />
            </View>

            <InputWithClearButton
              visible={true}
              value={enteredValue}
              lbl={"enterFirstName"}
              onPressClear={() => setEnteredValue("")}
              onChangeText={(v: string) => setEnteredValue(v)}
            />

            <InputWithLabel
              lbl="enterLastName"
              value={enteredValue}
              rootStyle={{ marginTop: 20 }}
              onChangeText={(v: string) => setEnteredValue(v)}
            />

            <IbanInput
              type="custom"
              visible={true}
              value={enteredValue}
              rootStyle={{ marginTop: 20 }}
              onChangeText={(v: string) => setEnteredValue(v)}
            />

            <CreditCardInput
              visible={true}
              type="credit-card"
              value={enteredValue}
              rootStyle={{ marginTop: 20 }}
              onChangeText={(v: string) => setEnteredValue(v)}
            />

            <InputPhoneNumber
              type="custom"
              visible={true}
              value={enteredValue}
              rootStyle={{ marginTop: 20 }}
              onChangeText={(v: string) => setEnteredValue(v)}
            />

            <PriceInput
              type="money"
              visible={true}
              value={enteredValue}
              rootStyle={{ marginTop: 20 }}
              onChangeText={(v: string) => setEnteredValue(v)}
            />

            <SearchInput
              visible
              lbl="searchItem"
              value={enteredValue}
              rootStyle={{ marginTop: 20 }}
              onPressClear={() => setEnteredValue("")}
              onChangeText={(v: string) => setEnteredValue(v)}
            />
          </View>
        ) : null}

        <TextButton
          lbl="others"
          lblStyle={{
            ...styles.itemButton,
            borderColor:
              theme === "light" ? appColors.bg.dark : appColors.bg.light,
          }}
          onPress={() => setShowOthers(!showOthers)}
          style={{ marginBottom: showOthers ? 0 : 20 }}
        />
        {showOthers ? (
          <View style={{ paddingVertical: 20 }}>
            <AppAvatar
              returnUriAndFileName={({ uri, fileName }) => {
                console.log({ uri, fileName });
              }}
              name="Mreza"
              rootStyle={{ marginTop: 20 }}
            />

            <AppDivider style={{ marginTop: 20 }} />

            <SimpleButton
              lbl="Show Toast"
              style={{ marginTop: 20 }}
              onPress={() => {
                showToast({
                  type: "error",
                  duration: 3000,
                  msg: "Error toast",
                });
              }}
            />

            <TimerCountDown
              style={{ marginTop: 20 }}
              secondsLeft={secondsLeft}
              onPressAgain={onStartAgain}
            />
          </View>
        ) : null}
      </ScrollView>
    </RootView>
  );
};

export default Content;

const styles = StyleSheet.create({
  rootStyle: {
    paddingTop: 20,
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
  itemButton: {
    fontSize: 20,
    paddingBottom: 3,
    borderBottomWidth: 1,
  },
  langStyle: {
    position: "absolute",
  },
  textBtnContainer: {
    width: "100%",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  test: {
    ...Platform.select({
      ios: {},
      android: {},
    }),
  },
});
