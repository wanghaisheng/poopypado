import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { WebSQLDatabase } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import { RootStackParamList } from "../../App";
import { AmountSlider } from "./AmountSlider";
import { ConfirmationModal } from "./ConfirmationModal";
import { DatePicker } from "./DatePicker";
import { Note } from "./Note";
import { Page } from "./Page";
import { PillButton } from "./PillButton";
import { TypeSelect } from "./TypeSelect";

interface Props extends NativeStackScreenProps<RootStackParamList, "Setting"> {
  db: WebSQLDatabase;
}
export const Setting = (props: Props) => {
  const { navigation, db } = props;

  const [date, setDate] = useState(new Date());

  const [amount, setAmount] = useState(3);
  const [note, setNote] = useState("");

  const [type, setType] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  useEffect(() => {
    navigation.setOptions({
      headerBackVisible: false,
      headerRight: () => {
        return (
          <TouchableOpacity onPress={() => setShowConfirmModal(true)}>
            <View>
              <Text>X</Text>
            </View>
          </TouchableOpacity>
        );
      },
    });
  }, []);

  // Prevent default behavior of leaving the screen
  React.useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        if (!showConfirmModal) {
          e.preventDefault();
          setShowConfirmModal(true);
        }
      }),
    [navigation, showConfirmModal]
  );

  const confirm = () => {
    db.transaction(
      (tx) => {
        tx.executeSql("insert into items (date) values (?)", [
          date.toISOString(),
        ]);
      },
      () => {
        console.log("success");
        navigation.navigate("Main");
      }
    );
  };

  return (
    <Page>
      <ScrollView>
        <DatePicker date={date} onChange={(d) => setDate(d)} />
        <TypeSelect type={type} onTypeSelect={setType} />
        <AmountSlider amount={amount} setAmount={setAmount} />
        <Note value={note} setValue={setNote} />

        <ConfirmationModal
          visible={showConfirmModal}
          onConfirm={() => navigation.navigate("Main")}
          onCancel={() => setShowConfirmModal(false)}
        />
      </ScrollView>
      <PillButton onPress={confirm}>Create Entry</PillButton>
    </Page>
  );
};
